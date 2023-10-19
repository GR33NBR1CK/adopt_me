import {createRoot} from "react-dom/client";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {lazy, Suspense, useState} from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import {Pet} from "./APIResponsesTypes";
import {ThemeProvider} from "@mui/material/styles";
import {theme, GradientBackground} from "./theme"
import "normalize.css";
import styled from "styled-components";
import {Container, Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShieldDog} from "@fortawesome/free-solid-svg-icons/faShieldDog";

const Header = styled.header`
  background: rgb(123, 210, 255);
  background: radial-gradient(circle, rgba(123, 210, 255, 1) 0%, rgba(85, 193, 247, 1) 18%, rgba(105, 200, 248, 1) 27%, rgba(73, 180, 233, 1) 37%, rgba(79, 180, 234, 1) 50%, rgba(109, 179, 238, 1) 79%);
  box-shadow: 6px 13px 77px 6px rgba(0, 0, 0, 0.75);
  height: 100px;
  display: flex;
  justify-content: flex-start;
  padding-left: 20px;
  align-items: center;
  margin-bottom: 50px;

  svg {
    font-size: 60px;
    color: #cc6600
  }

  a {
    text-decoration: none;
    color: #cc6600;
  }

  h3 {
    font-weight: 900;
  }
`

const Footer = styled.footer`
  background: rgb(123, 210, 255);
  background: radial-gradient(circle, rgba(123, 210, 255, 1) 0%, rgba(85, 193, 247, 1) 18%, rgba(105, 200, 248, 1) 27%, rgba(73, 180, 233, 1) 37%, rgba(79, 180, 234, 1) 50%, rgba(109, 179, 238, 1) 79%);
  box-shadow: 6px 13px 77px 6px rgba(0, 0, 0, 0.75);
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  svg {
    font-size: 60px;
    color: #cc6600
  }

  a {
    text-decoration: none;
    color: #cc6600;
  }

  h3 {
    font-weight: 900;
  }
`

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
    const [adoptedPet, setAdoptedPet] = useState<(Pet & { activeImage: string }) | null>(null);

    return (
        <ThemeProvider theme={theme}>
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
                            <GradientBackground>
                                <Header>
                                    <FontAwesomeIcon icon={faShieldDog} size="2xl"/>
                                    <Typography variant="h3">
                                        <Link to="/">Adopt Me</Link>
                                    </Typography>
                                </Header>

                                <Routes>
                                    <Route path="/" element={<SearchParams/>}/>
                                    <Route
                                        path="/details/:id/"
                                        element={<Details/>}
                                    />
                                </Routes>

                                <Footer>
                                    <Typography variant="h3">
                                        Footer
                                    </Typography>
                                </Footer>
                            </GradientBackground>
                        </AdoptedPetContext.Provider>
                    </Suspense>
                </QueryClientProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
};

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(<App/>);
