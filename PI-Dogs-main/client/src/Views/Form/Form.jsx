import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllDogs } from "../../Redux/actions";
import validate from "./Validation";
import styles from "./Form.module.css";

const Form = () => {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.tempsFilter);
    const [formData, setFormData] = useState({
        image: "",
        name: "",
        weight: "",
        height: "",
        life_span: "",
        temps: []
    });

    const [successMessagePosting, setSuccessMessagePosting] = useState("");
    const [errorMessagePosting, setErrorMessagePosting] = useState("");

    const [formErrors, setFormErrors] = useState({
        image: "",
        name: "",
        weight: "",
        height: "",
        life_span: "",
        temps: ""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);

        try {
            const response = await axios.post("http://localhost:3001/dogs", formData);
            const newDog = response.data;
            setSuccessMessagePosting("Dog successfully added");
            setFormData({
                image: "",
                name: "",
                weight: "",
                height: "",
                life_span: "",
                temps: []
            })

            dispatch(getAllDogs());
            console.log("Dog Posted", newDog);
        } catch (error) {
            setErrorMessagePosting("Something went wrong");
            console.error(error);

        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
        setFormErrors(validate({ ...formData, [event.target.name]: event.target.value }));
    };


    const handleChangeTemps = (event) => {
        let selectedTemp = event.target.value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            temps: [...prevFormData.temps, selectedTemp]
        }));
        console.log(formData.temps);
    };

    const handleResetTemps = (event) => {
        event.preventDefault();
        setFormData((prevFormData) => ({
            ...prevFormData,
            temps: []
        }));
    }

    return (
        <div className={styles.FormContainer}>
            <div className={styles.FormDiv}>
                <div className={styles.BackButtonContainer}>
                    <NavLink className={styles.BackButton} to={"/home"}>Back</NavLink>
                </div>
                <div className={styles.FormTitleContainer}>
                    <img className={styles.FormImage} src="https://www.bil-jac.com/media/sy5jgj4k/dog-leo-min.png?width=400&mode=max&quality=80" alt="dog" />
                    <h1 className={styles.FormTitle}>CREATE DOG</h1>
                </div>
                <form className={styles.Form} onSubmit={handleSubmit}>
                    <label className={styles.FormLabel} htmlFor="image">Image:</label>
                    <input className={styles.FormInput} type="text" name="image" onChange={handleChange} />
                    {formErrors && <p className={styles.FormError}>{formErrors.image}</p>}

                    <label className={styles.FormLabel} htmlFor="name">Name:</label>
                    <input className={styles.FormInput} type="text" name="name" onChange={handleChange} />
                    {formErrors && <p className={styles.FormError}>{formErrors.name}</p>}

                    <label className={styles.FormLabel} htmlFor="weight">Weight:</label>
                    <input className={styles.FormInput} type="text" name="weight" onChange={handleChange} />
                    {formErrors && <p className={styles.FormError}>{formErrors.weight}</p>}

                    <label className={styles.FormLabel} htmlFor="height">Height:</label>
                    <input className={styles.FormInput} type="text" name="height" onChange={handleChange} />
                    {formErrors && <p className={styles.FormError}>{formErrors.height}</p>}

                    <label className={styles.FormLabel} htmlFor="life_span">Life Span:</label>
                    <input className={styles.FormInput} type="text" name="life_span" onChange={handleChange} />
                    {formErrors && <p className={styles.FormError}>{formErrors.life_span}</p>}

                    <label className={styles.FormLabel} htmlFor="temps">Temperaments:</label>
                    <select className={styles.FormSelect} onChange={handleChangeTemps}>
                        <option disabled>Select Temperaments</option>
                        {temperaments.map((temp) => (
                            <option key={temp} value={temp}>
                                {temp}
                            </option>
                        ))}
                    </select>

                    <input
                        className={styles.FormInput}
                        type="text"
                        name="temps"
                        value={formData.temps.join(", ")}
                        readOnly
                    />
                    <button className={styles.FormResetButton} onClick={handleResetTemps}>Reset selection</button>
                    {formErrors && <p className={styles.FormError}>{formErrors.temps}</p>}

                    <button className={styles.FormButton} type="submit" disabled={Object.keys(formErrors).length !== 0}>Submit</button>
                </form>
                {successMessagePosting && <p className={styles.SuccessMessagePosting}>{successMessagePosting}</p>}
                {errorMessagePosting && <p className={styles.ErrorMessagePosting}>{errorMessagePosting}</p>}
            </div>
        </div>
    );
}

export default Form;