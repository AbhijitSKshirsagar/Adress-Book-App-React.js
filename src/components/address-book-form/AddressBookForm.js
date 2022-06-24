import React, { useState, useEffect } from 'react'
import './Form.css'
import { Link, useParams } from 'react-router-dom';
import AddressBookService from '../../service/AddressBookService'
import Button from '@mui/material/Button';

const Form = (props) => {

    let startValue = {
        fName: "",
        lName: "",
        phoneNumber: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        isUpdate: false,
    }
    const [formValue, setForm] = useState(startValue)

    const onReset = () => {
        setForm({
            ...startValue, id: formValue.id, isUpdate: formValue.isUpdate
        });
    };

    const onNameChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
        console.log('value for', event.target.name, event.target.value);
    }

    const params = useParams();
    useEffect(() => {
        console.log(params.id)
        if (params.id) {
            getPersonId(params.id)
            console.log(params.id)
        }
    }, [params.id]);

    const getPersonId = (employeeId) => {
        console.log("Data Found")
        AddressBookService.getPersonById(employeeId).then((data) => {
            let obj = data.data.data;
            console.log(obj);
            setData(obj);
        });
    };

    const setData = (obj) => {
        console.log()
        setForm({
            ...formValue,
            ...obj,
            id: obj.id,
            fName: obj.fName,
            lName: obj.lName,
            phoneNumber: obj.phoneNumber,
            email: obj.email,
            address: obj.address,
            city: obj.city,
            state: obj.state,
            zipCode: obj.zipCode,
            country: obj.country,
            isUpdate: true,
        });
    };

    const save = async (event) => {
        event.preventDefault();

        let object = {
            id: formValue.id,
            fName: formValue.fName,
            lName: formValue.lName,
            phoneNumber: formValue.phoneNumber,
            email: formValue.email,
            address: formValue.address,
            city: formValue.city,
            state: formValue.state,
            zipCode: formValue.zipCode,
            country: formValue.country
        };

        if (formValue.isUpdate) {
            AddressBookService.updatePerson(params.id, object)
                .then((data) => {
                    var value = window.confirm(data);
                    if (value === true) {
                        alert("update successfull!");
                        this.props.history.push("");
                    } else {
                        window.location.reload();
                    }
                });
        } else {
            AddressBookService.addPerson(object).then((response) => {
                console.log(response);
                alert("Data Added!!")
            })
        }
        // window.location.reload();
    }

    return (
        <div>

            <div className="form-content">
                <div className="home-button">
                    <Link to="/home">
                        <Button variant="contained" size="large">Home</Button></Link>
                </div>
                <div className="form-head">

                    <span> PERSON ADDRESS FORM </span>
                </div>

                <form className="form" action="#" onSubmit={save}>
                    <label className="label text" htmlFor="name">First Name</label>
                    <div className="row-content">
                        <input className="input" type="text" id="fName" name="fName" placeholder="Enter Name"
                            onChange={onNameChange} value={formValue.fName} required />
                        <error-output className="fullname-error" htmlFor="name"></error-output>
                    </div>

                    <label className="label text" htmlFor="name">Last Name</label>
                    <div className="row-content">
                        <input className="input" type="text" id="lName" name="lName" placeholder="Enter Name"
                            onChange={onNameChange} value={formValue.lName} required />
                        <error-output className="fullname-error" htmlFor="name"></error-output>
                    </div>

                    <label className="label text" htmlFor="phone">Phone Number</label>
                    <div className="row-content">
                        <input className="input" type="number" id="phoneNumber" name="phoneNumber" placeholder="Enter Phone Number"
                            onChange={onNameChange} value={formValue.phoneNumber} required />
                        <error-output className="phone-error" htmlFor="number"></error-output>
                    </div>

                    <label className="label text" htmlFor="email">Email</label>
                    <div className="row-content">
                        <input className="input" type="text" id="email" name="email" placeholder="Enter Email"
                            onChange={onNameChange} value={formValue.email} required />
                        <error-output className="fullname-error" htmlFor="email"></error-output>
                    </div>

                    <label className="label text" htmlFor="address">Address</label>
                    <div className="row-content">
                        <textarea className="input" name="address" id="address" rows="4" placeholder="Enter Address"
                            onChange={onNameChange} value={formValue.address} ></textarea>
                    </div>

                    <div className="row">
                        <div className="input-content">
                            <label className="label text" htmlFor="city">City</label>
                            <div className="row-content">
                                <select className="input" name="city" id="city" value={formValue.city} onChange={onNameChange} >
                                    <option value="">City</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Solapur">Solapur</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Chennai">Wardha</option>
                                    <option value="Kolkata">Amravti</option>
                                    <option value="Nagpur">Nagpur</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-content">
                            <label className="label text" htmlFor="state">State</label>
                            <div className="row-content">
                                <select className="input" name="state" id="state" onChange={onNameChange} value={formValue.state}>
                                    <option value="">State</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="West Bengal">West Bengal</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-content">
                            <label className="label text" htmlFor="zip">ZipCode</label>
                            <div className="row-content">
                                <input className="input" type="number" id="zipCode" name="zipCode" placeholder="Enter Zip Code"
                                    onChange={onNameChange} value={formValue.zipCode} required />
                                <error-output className="zip-error" htmlFor="number"></error-output>
                            </div>
                        </div>
                    </div>
                    <div className="input-content">
                        <label className="label text" htmlFor="country">Country</label>
                        <div className="row-content">
                            <select className="input" name="country" id="country" onChange={onNameChange} value={formValue.country}>
                                <option value="">Country</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UAE">UAE</option>
                                <option value="Russia">Russia</option>
                            </select>
                        </div>
                    </div>
                    <div className="buttonParent">
                        <div className="add-reset">
                            <button type="submit" className="button addButton" id="addButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>

                            <button type="reset" className="resetButton button" id="resetButton" onClick={onReset}>Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form;