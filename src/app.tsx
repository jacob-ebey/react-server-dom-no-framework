import { url } from "./server-context.js";

function Home() {
  return <h1>Hello World</h1>;
}

function About() {
  return <h1>About</h1>;
}

function NotFound() {
  return <h1>Not Found</h1>;
}

export function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </nav>
        <main>
          {(() => {
            switch (url().pathname.replace(/\/$/, "")) {
              case "":
                return <Home />;
              case "/about":
                return <About />;
              default:
                return <NotFound />;
            }
          })()}
        </main>
      </body>
    </html>
  );
}
