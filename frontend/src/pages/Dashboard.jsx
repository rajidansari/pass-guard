import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../contexts/UserContextProvider";
import { VscAdd } from "react-icons/vsc";
import axios from "axios";
import AddPassword from "../components/AddPassword";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CgProfile } from "react-icons/cg";
import { Helmet } from "react-helmet";
import { BASE_URI } from "../config";

const Dashboard = () => {
    const [voults, setVoults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddPasswordPanel, setShowAddPasswordPanel] = useState(false);

    const addPenelRef = useRef(null);

    const { user } = useAuth();

    const getPasswords = async () => {
        try {
            const response = await axios.get(
                `${BASE_URI}/password/my-passwords`,
                { withCredentials: true }
            );

            if (response.status === 200) {
                setVoults(response.data.reverse());
            }
        } catch (error) {
            console.log(`Error while password fetching ${error}`);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getPasswords();
    }, []);

    useGSAP(() => {
        if (showAddPasswordPanel) {
            gsap.to(addPenelRef.current, {
                scale: "1",
            });
        } else {
            gsap.to(addPenelRef.current, {
                scale: "0",
            });
        }
    }, [showAddPasswordPanel]);

    return (
        <>
        {/* seo content */}
            <Helmet>
                <title>Dashboard | PassGuard</title>
                <meta
                    name="description"
                    content="Your secure dashboard to manage saved passwords and credentials with PassGuard."
                />
                <meta property="og:title" content="Dashboard | PassGuard" />
                <meta
                    property="og:description"
                    content="Your secure dashboard to manage saved passwords."
                />
                <meta
                    property="og:image"
                    content="https://passguard0.vercel.app/og-image.png"
                />
                <meta
                    property="og:url"
                    content="https://passguard0.vercel.app/dashboard"
                />
            </Helmet>

            <main className="min-h-screen w-full bg-white flex flex-col">
                {/* Navbar */}
                <nav className="px-3 md:px-8 h-14 shadow font-outfit flex-shrink-0 transition-all duration-100 ease-linear w-full z-10 bg-white">
                    <div className="h-full w-full flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="logo h-10 w-10 md:h-9 md:w-9 rounded-lg overflow-hidden">
                                <img
                                    src={"pass_guard.png"}
                                    alt=""
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <h2
                                draggable={true}
                                className="hidden sm:block text-[22px] md:text-[25px] text-primary font-semibold tracking-tight cursor-default select-none"
                            >
                                PassGuard
                            </h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xs md:text-base">
                                Hey,{" "}
                                <span className="text-primary font-semibold font-poppins">
                                    {user.fullname}
                                </span>{" "}
                            </h2>
                            <CgProfile className="text-lg md:text-xl" />
                        </div>
                    </div>
                </nav>
                {/* Main Content */}
                <div className="flex flex-1 w-0 md:w-full">
                    {/* Sidebar */}
                    <aside className="h-full w-0 lg:w-2/12">
                        <Sidebar />
                    </aside>
                    {/* Main Panel */}
                    <section className="flex-1 min-h-full w-full lg:w-10/12 absolute md:static top-14 right-0 border-l-0 md:border-l-2 border-light shadow-2xl z-1 py-2 px-3 md:px-7">
                        <div className="mt-3 ml-0 md:ml-5 flex flex-col sm:flex-row sm:items-center gap-3">
                            <button
                                onClick={() => setShowAddPasswordPanel(true)}
                                className="py-2 px-3 rounded-md bg-emarGreen text-white font-semibold font-outfit flex items-center gap-2 cursor-pointer active:bg-emerald-600 transition-all text-wrap w-fit"
                            >
                                Add New{" "}
                                <span>
                                    <VscAdd className="font-bold h-5 w-5" />
                                </span>
                            </button>
                            <h2 className="text-sm text-gray-600 leading-none font-poppins">
                                Total saved - {voults.length}
                            </h2>
                        </div>
                        <div className="mt-5 ml-0 md:ml-5 flex flex-wrap gap-3">
                            {voults.length > 0 ? (
                                voults.map((voult) => (
                                    <div
                                        key={voult._id}
                                        className="min-h-28 w-full sm:w-[48%] md:w-[31%] lg:w-[23%] py-2 px-3 rounded-md bg-dark/80 shadow-lg text-wrap border-[1px] border-dark/30 flex flex-col mb-2"
                                    >
                                        <h2 className="text-center mb-2 font-semibold font-poppins text-light underline break-words">
                                            {voult.site}
                                        </h2>
                                        <p className="text-gray-300 font-outfit break-all">
                                            username ~
                                            <span className="text-gray-200 font-semibold">
                                                {" "}
                                                {voult.username}
                                            </span>
                                        </p>
                                        <div className="text-gray-300 font-outfit flex items-center">
                                            <span className="w-24">
                                                Password ~
                                            </span>
                                            <input
                                                type="password"
                                                value={voult.password}
                                                className="text-gray-200 w-2/3 outline-none bg-transparent"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="mt-3 text-gray-600 font-poppins text-sm">
                                    No voults.
                                </p>
                            )}
                        </div>
                    </section>
                </div>
                <AddPassword
                    showPasswordPanel={showAddPasswordPanel}
                    setShowPasswordPanel={setShowAddPasswordPanel}
                    ref={addPenelRef}
                />
            </main>
        </>
    );
};

export default Dashboard;
