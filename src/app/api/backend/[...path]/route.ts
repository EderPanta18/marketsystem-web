// app/api/backend/[...path]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG } from "@/core/config";

const BACKEND_URL = API_CONFIG.BASE_URL;

const handler = async (req: NextRequest) => {
  try {
    const { pathname, search } = req.nextUrl;
    const path = pathname.replace("/api/backend", "");
    const backendUrl = `${BACKEND_URL}${path}${search}`;

    console.log("Pedido del backend:", {
      method: req.method,
      originalPath: pathname,
      backendUrl,
      contentType: req.headers.get("content-type"),
    });

    const headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "NextJS-Proxy/1.0",
    });

    const authHeader = req.headers.get("authorization");
    if (authHeader) {
      headers.set("Authorization", authHeader);
    }

    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      headers.set("Cookie", cookieHeader);
    }

    headers.set("Origin", req.headers.get("origin") || "http://localhost:3000");
    headers.set(
      "Referer",
      req.headers.get("referer") || "http://localhost:3000"
    );

    const fetchOptions: RequestInit = {
      method: req.method,
      headers,
    };

    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
      try {
        const bodyText = await req.text();
        if (bodyText.trim()) {
          try {
            JSON.parse(bodyText);
            fetchOptions.body = bodyText;
            console.log("Cuerpo de la solicitud:", bodyText);
          } catch (jsonError) {
            console.error("JSON inválido:", jsonError);
            return NextResponse.json(
              { error: "Formato JSON inválido" },
              { status: 400 }
            );
          }
        }
      } catch (error) {
        console.error("Error al leer el cuerpo de la solicitud:", error);
        return NextResponse.json(
          { error: "Error al leer el cuerpo de la solicitud" },
          { status: 400 }
        );
      }
    }

    console.log("Enviando solicitud al backend:", {
      url: backendUrl,
      method: req.method,
      headers: Object.fromEntries(headers.entries()),
    });

    const backendResponse = await fetch(backendUrl, fetchOptions);

    console.log("Respuesta del backend:", {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: Object.fromEntries(backendResponse.headers.entries()),
    });

    const responseHeaders = new Headers();

    backendResponse.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();

      if (lowerKey === "set-cookie") {
        responseHeaders.append("Set-Cookie", value);
      } else if (lowerKey === "content-type") {
        responseHeaders.set("Content-Type", value);
      } else if (lowerKey === "authorization") {
        responseHeaders.set("Authorization", value);
      }
    });

    const origin = req.headers.get("origin") || "http://localhost:3000";
    responseHeaders.set("Access-Control-Allow-Origin", origin);
    responseHeaders.set("Access-Control-Allow-Credentials", "true");
    responseHeaders.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    responseHeaders.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, Accept, Origin, Cookie"
    );

    const responseBody = await backendResponse.text();

    console.log("Enviando respuesta al frontend:", {
      status: backendResponse.status,
      bodyLength: responseBody.length,
      body:
        responseBody.substring(0, 200) +
        (responseBody.length > 200 ? "..." : ""),
    });

    return new NextResponse(responseBody, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Error del proxy:", error);

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json(
        {
          error: "No se puede conectar al servidor backend",
          details: error.message,
          backendUrl: BACKEND_URL,
        },
        {
          status: 502,
          headers: {
            "Access-Control-Allow-Origin": req.headers.get("origin") || "*",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
    }

    return NextResponse.json(
      {
        error: "Proxy server error",
        details: error instanceof Error ? error.message : "Unknown error",
        backendUrl: BACKEND_URL,
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": req.headers.get("origin") || "*",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
  }
};

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin") || "http://localhost:3000";

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With, Accept, Origin, Cookie",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
  handler as HEAD,
};
