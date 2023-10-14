import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import {Pet} from "./APIResponsesTypes";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
        },
    },
});

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
    const [adoptedPet, setAdoptedPet] = useState<Pet>((null as unknown) as Pet);
    // const [theme, setTheme] = useState("darkMode");

    return (
        <div
            className="p-0 m-0"
            style={{
                background:
                    "url(https://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
            }}
        >
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <Suspense
                        fallback={
                            <div className="loading-pane">
                                <h2 className="loader">🌀</h2>
                            </div>
                        }
                    >
                        <AdoptedPetContext.Provider value={[adoptedPet, setAdoptedPet]}>
                            <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500">
                                <Link
                                    className="text-6xl text-white hover:text-gray-200"
                                    to="/"
                                >
                                    Adopt Me!
                                </Link>
                            </header>
                            <Routes>
                                <Route path="/" element={<SearchParams />} />
                                <Route
                                    path="/details/:id/"
                                    element={<Details />}
                                />
                            </Routes>
                        </AdoptedPetContext.Provider>
                    </Suspense>
                </QueryClientProvider>
            </BrowserRouter>
        </div>
    );
};

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(<App />);
