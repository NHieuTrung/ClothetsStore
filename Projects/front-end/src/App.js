import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Navigation from './navigation/Navigation';
import Index from './index/Index';

function App() {
     return (
        <div>
            <Header></Header>
            <Navigation></Navigation>
            <Index></Index>
            <div>
                Body
            </div>
            <Footer></Footer>
        </div>
    );
}

export default App;
