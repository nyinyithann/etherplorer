import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { mountStoreDevtool } from 'simple-zustand-devtools';
import Navbar from './components/NavBar';
import SuspensionLoader from './components/SuspensionLoader';
import useTheme from './hooks/useTheme';
import NoMatch from './pages/NoMatch';
import ThemeSwitchProvider from './providers/ThemeSwitchProvider';

import { useRecentBlocksAndTxnStore } from './stores';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Block = React.lazy(() => import('./pages/Block'));
const TransactionPage = React.lazy(() => import('./pages/TransactionPage'));

function App() {
    const [theme, setTheme] = useTheme('theme-blue');

    React.useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            mountStoreDevtool('Recent Blocks & Txn', useRecentBlocksAndTxnStore);
        }
    }, []);

    return (
        <ThemeSwitchProvider value={{ theme, setTheme }}>
            <div>
                <div className={`${theme} flex flex-col dark:bg-slate-600`}>
                    <Navbar setTheme={setTheme} />
                    <div className="h-screen py-12 dark:bg-slate-600 md:py-14">
                        <Routes>
                            <Route
                                index
                                path="/"
                                element={
                                    <SuspensionLoader>
                                        <Home />
                                    </SuspensionLoader>
                                }
                            />
                            <Route
                                path="/about"
                                element={
                                    <SuspensionLoader>
                                        <About />
                                    </SuspensionLoader>
                                }
                            />
                            <Route
                                path="/txn/:txHash"
                                element={
                                    <SuspensionLoader>
                                        <TransactionPage />
                                    </SuspensionLoader>
                                }
                            />
                            <Route
                                path="/block/:blockNumber"
                                element={
                                    <SuspensionLoader>
                                        <Block />
                                    </SuspensionLoader>
                                }
                            />
                            <Route path="*" element={<NoMatch />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </ThemeSwitchProvider>
    );
}

export default App;
