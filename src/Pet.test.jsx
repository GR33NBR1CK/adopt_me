import {test, expect} from "vitest"
import {render} from "@testing-library/react";
import Pet from "./Pet"
import {StaticRouter} from "react-router-dom/server";

test("display default thumbnail", async () => {
    const pet = render(
        <StaticRouter location="/">
            <Pet/>
        </StaticRouter>)

    const petThumbnail = await pet.findByTestId("thumbnail")

    expect(petThumbnail.src).toContain("none.jpg")

    pet.unmount()
});

test("display non-default thumbnail", async () => {
    const pet = render(
        <StaticRouter location="/">
            <Pet images={["1.jpg", "2.jpg", "3.jpg"]}/>
        </StaticRouter>
    )

    const nonDefaultThumbnail = await pet.findByTestId("thumbnail")

    expect(nonDefaultThumbnail.src).toContain("1.jpg")
    pet.unmount()
})
