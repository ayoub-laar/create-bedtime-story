import Footer from "./components/Home/Footer";
import Hero from "./components/Home/hero";
import NavBar from "./components/Home/navbar";
import Pricing from "./components/Home/pricing";
import Partners from "./components/Home/partners";
import Faq from "./components/Home/faq";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main>
                <Hero />
                <Partners />
                <Pricing />
                <Faq />
            </main>
            <Footer />
        </div>
    );
}