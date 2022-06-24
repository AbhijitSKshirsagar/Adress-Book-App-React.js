import React, { Component } from "react";
import "./Home.css";
import { Link, withRouter } from "react-router-dom";
import Logo from "../../assets/icons/add-24px.svg";
import Delete from "../../assets/icons/delete-black-18dp.svg";
import Edit from "../../assets/icons/create-black-18dp.svg";
import AddressBookService from "../../service/AddressBookService.js";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addressbook: [],
    };
  }

  componentDidMount() {
    this.fetchData();
    console.log(this.props);
  }

  fetchData() {
    AddressBookService.getAllContacts().then((response) => {
      this.setState({ addressbook: response.data.data });
    });
  }

  delete = (personId) => {
    let id = parseInt(personId);
    AddressBookService.deletePerson(id);
    window.location.reload();
  };

  update = (id) => {
    this.props.history.push(`AddressBookForm/${id}`);
    console.log(id);
  };
  
  render() {
    return (
      <div>
        <div className="main-content">
          <div className="header-content">
            <div className="person-detail-text">Person Details</div>
            <Link to="/form" className="add-button">
              <img src={Logo} alt="Add User Logo" />
              Add User
            </Link>
          </div>

          <table id="table-display" className="table">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>ZipCode</th>
              <th>Country</th>
              <th>Action</th>
            </tr>
            <tbody>
              {this.state.addressbook.map((book, index) => (
                <tr key={`${index}`}>
                  <td>{book.fName}</td>
                  <td>{book.lName}</td>
                  <td>{book.phoneNumber}</td>
                  <td>{book.email}</td>
                  <td>{book.address}</td>
                  <td>{book.city}</td>
                  <td>{book.state}</td>
                  <td>{book.zipCode}</td>
                  <td>{book.country}</td>
                  <td>
                    <img
                      src={Delete}
                      alt="delete"
                      onClick={() => this.delete(book.id)}
                    />
                    <img
                      src={Edit}
                      alt="edit"
                      onClick={() => this.update(book.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default withRouter(Home);