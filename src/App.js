import { useState } from "react";
import Input from "./components/Input.jsx";
import { validateForm } from "./hooks/formValidate.js";

function App() {
    const [form, setForm] = useState([
        {
            id: "first-name",
            name: "first-name",
            type: "text",
            placeholder: "First name",
            validate: ["isNotEmpty"],
            isValidated: false,
            errorFormName: "First name",
            error: "",
        },
        {
            id: "last-name",
            name: "last-name",
            type: "text",
            placeholder: "Last name",
            validate: ["isNotEmpty"],
            isValidated: false,
            errorFormName: "Last name",
            error: "",
        },
        {
            id: "email",
            name: "email",
            type: "email",
            placeholder: "Email",
            validate: ["isNotEmpty", "isEmail"],
            isValidated: false,
            errorFormName: "Email",
            error: "",
        },
        {
            id: "password",
            name: "password",
            type: "text",
            placeholder: "Password",
            validate: ["isNotEmpty"],
            isValidated: false,
            errorFormName: "Password",
            error: "",
        },
    ]);

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        setForm(
            form.map(eachForm => {
                const formStatus = validateForm(
                    formData.get(eachForm.name),
                    eachForm.validate,
                    eachForm.errorFormName
                );
                eachForm.isValidated = !formStatus.isPass;
                eachForm.error = formStatus.message;
                return eachForm;
            })
        );
    }

    return (
        <div className="App">
            <div className="lg:min-h-screen font-poppins bg-primary-red-500 bg-intro-mobile lg:bg-intro-desktop overflow-hidden bg-desktop-intro lg:flex py-24">
                <div className="container flex flex-grow">
                    <div className="-mx-3 flex flex-wrap h-full">
                        <div className="px-3 py-20 lg:py-0 w-full lg:w-1/2 h-full flex flex-col justify-center items-center">
                            <div className="text-white space-y-8 my-auto xl:w-10/12">
                                <h1 className="text-4xl lg:text-5xl text-center lg:text-left font-bold">
                                    Learn to code by watching others
                                </h1>
                                <p>
                                    See how experienced developers solve
                                    problems in real-time. Watching scripted
                                    tutorials is great, but understanding how
                                    developers think is invaluable.
                                </p>
                            </div>
                        </div>
                        <div className="px-3 w-full lg:w-1/2 flex items-center">
                            <div className="space-y-8 w-full">
                                <h2 className="bg-accent-blue-500 text-center text-white py-4 rounded-lg relative z-30 shadow-hard-gray">
                                    <span className="relative z-30 font-semibold">
                                        Try it free 7 days
                                    </span>
                                    <span className="font-thin ml-1 relative z-30">
                                        then $20/mo. thereafter
                                    </span>
                                </h2>
                                <form
                                    className="bg-white rounded-lg shadow-hard-gray"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="p-8 text-sm space-y-6">
                                        {form.map((_form, _index) => {
                                            return (
                                                <Input
                                                    key={`form-${_index}`}
                                                    id={_form.id}
                                                    name={_form.name}
                                                    placeholder={
                                                        _form.placeholder
                                                    }
                                                    isValidated={
                                                        _form.isValidated
                                                    }
                                                    error={_form.error}
                                                />
                                            );
                                        })}
                                        <input
                                            type="submit"
                                            value="Claim your free trial"
                                            className="bg-primary-green-500 hover:bg-primary-green-600 active:bg-primary-green-700 cursor-pointer font-semibold text-white py-4 rounded-lg text-center w-full uppercase border-b-[6px] border-primary-green-600"
                                        />
                                        <p className="text-center text-neutral-grayish-blue-500 text-[12px]">
                                            By clicking the button, you are
                                            agreeing to our
                                            <a
                                                className="text-primary-red-500 font-semibold ml-1"
                                                href="/"
                                                onClick={e =>
                                                    e.preventDefault()
                                                }
                                            >
                                                Terms and Services
                                            </a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
