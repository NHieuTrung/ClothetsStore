import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Navigation from './navigation/Navigation';

function App() {
     return (
        <div>
            <Header></Header>
            <Navigation></Navigation>
            <div>
                Body
            </div>
            <Footer></Footer>
        </div>
    );
}

export default App;
