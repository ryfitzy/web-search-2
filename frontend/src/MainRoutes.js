import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from ".//pages/HomePage";
import WebSearch from ".//pages/WebSearch";
import LocalSongSearch from ".//pages/LocalSongSearch";

function MainRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/WebSearch" element = {<WebSearch />} />
                <Route path="/LocalSongSearch" element = {<LocalSongSearch />} />
            </Routes>
        </Router>
    );
}

export default MainRoutes;
