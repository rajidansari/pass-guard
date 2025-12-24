import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../contexts/UserContextProvider";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { IoIosCopy } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { HiPencilSquare } from "react-icons/hi2";
import AddPassword from "../components/AddPassword";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BASE_URI } from "../config";

const Voult = () => {
    const [voults, setVoults] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [updatePasswordPanel, setUpdatePasswordPanel] = useState(false);
    // const updatePanelRef = useRef();

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
    }, [voults]);

    // useGSAP(() => {
    //     if (updatePasswordPanel) {
    //         gsap.to(updatePanelRef.current, {
    //             scale: "1",
    //         });
    //     } else {
    //         gsap.to(updatePanelRef.current, {
    //             scale: "0",
    //         });
    //     }
    // }, [updatePasswordPanel]);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast("Copied", {
            autoClose: 3000,
        });
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.get(
                `${BASE_URI}/password/delete/${id}`,
                { withCredentials: true }
            );
            if (response.status === 200) {
                toast("Password deleted.");
            }
        } catch (error) {
            toast("Someting went wrong, try again.");
            console.error(`password deletion error :: ${error}`);
        }
    };

    const handleUpdate = () => {
        toast("Currently not available. if you wrote something wrong, just delete this one and re-add the new.")
    }

    return (
        <div className="h-dvh w-full overflow-hidden">
            <ToastContainer />
            <div>
                <nav className="px-3 md:px-18 h-14 shadow font-outfit transition-all duration-100 ease-linear">
                    <div className="h-full w-full  flex items-center justify-between">
                        <div className="flex items-center gap-1 ">
                            <div className="logo h-14 w-14 md:h-9 md:w-9 rounded-lg overflow-hidden">
                                <img src={"pass_guard.png"} alt="" />
                            </div>
                            <h2
                                draggable={true}
                                className="hidden sm:block md:block  text-[25px] text-primary font-semibold tracking-tight cursor-default select-none "
                            >
                                PassGuard
                            </h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-3">
                                <h2>
                                    Hey,{" "}
                                    <span className="text-primary font-semibold font-poppins">
                                        {user.fullname}
                                    </span>{" "}
                                </h2>
                                <CgProfile className="text-xl" />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <aside className="h-full w-0 lg:w-2/12">
                    <Sidebar />
                </aside>
            <div
                className={`h-[92.3%] w-10/12 absolute top-14 right-0 border-l-2 border-light shadow-2xl z-1 py-2 px-7`}
            >
                <div className="h-full w-full pt-10 overflow-y-scroll sm:overflow-x-scroll md:overflow-x-hidden">
                    {voults.length > 0 ? (
                        <table className="w-[150vw] md:w-full">
                            <thead className="font-poppins border-b-[1px] border-emarGreen">
                                <tr className="">
                                    <th className="lg:w-1/4 md:w-1/5">Site</th>
                                    <th className=" lg:w-1/4 md:w-2/5">Username</th>
                                    <th className=" lg:w-1/4 md:w-2/5">Password</th>
                                    <th className=" lg:w-1/4 md:w-1/5">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-start ">
                                {voults.map((voult) => (
                                    <tr
                                        key={voult._id}
                                        className="h-10 border-b-[1px] border-gray-300"
                                    >
                                        <td className="pl-2 border-r-[1px] border-gray-300">
                                            {voult.site}
                                        </td>
                                        <td className="pl-2 border-r-[1px] border-gray-300 relative">
                                            <p>{voult.username}</p>
                                            <p
                                                onClick={() =>
                                                    handleCopy(voult.username)
                                                }
                                                className="absolute top-2 right-2 md:right-5 cursor-pointer text-lg"
                                            >
                                                <IoIosCopy title="copy" />
                                            </p>
                                        </td>
                                        <td className="pl-2 border-r-[1px] border-gray-300 relative">
                                            {voult.password}
                                            <p
                                                onClick={() =>
                                                    handleCopy(voult.password)
                                                }
                                                className="absolute top-2 right-2 md:right-5 cursor-pointer text-lg"
                                            >
                                                <IoIosCopy title="copy" />
                                            </p>
                                        </td>
                                        <td className="h-10 flex gap-3 lg:gap-5 items-center justify-center ">
                                            <span
                                                onClick={handleUpdate}
                                                className="underline text-lg cursor-pointer"
                                            >
                                                <HiPencilSquare title="update" className="text-gray-600" />
                                            </span>
                                            <span
                                                onClick={() =>
                                                    handleDelete(voult._id)
                                                }
                                                className="underline text-lg cursor-pointer"
                                            >
                                                <MdDelete title="delete" />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-sm text-gray-600 font-outfit">
                            No voults
                        </p>
                    )}
                </div>
            </div>
            {/* <AddPassword
                showPasswordPanel={updatePasswordPanel}
                setShowPasswordPanel={setUpdatePasswordPanel}
                ref={updatePanelRef}
            /> */}
        </div>
    );
};

export default Voult;
