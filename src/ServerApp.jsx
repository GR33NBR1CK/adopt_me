import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { renderToPipeableStream } from "react-dom/server";

export default function render(url, opts) {
    return renderToPipeableStream(
        <StaticRouter location={url}>
            <App />
        </StaticRouter>,
        opts
    );
}
