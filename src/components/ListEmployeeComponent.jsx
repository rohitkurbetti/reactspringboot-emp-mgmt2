import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import { Button, Modal } from "antd";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css



class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: [],
                empDetails: {},
                visible: false,
                salDetails: {},
                salData:''
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.getEmpDetails = this.getEmpDetails.bind(this);

    }

    showModal = () => {
        this.setState({
            visible:true
        });
    }

    handleOk = e => {
        this.setState({
            visible: false
        })
    }

    handleCancel = e => {
        this.setState({
            visible: false
        });
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    getEmpDetails(id){
        EmployeeService.getEmpDetails(id).then( res => {
            this.setState({empDetails: res.data});
            console.log(res.data)
        });
        this.showModal();
    }

    getSalaryDetails(id) {
        EmployeeService.getSalaryDetails(id).then(res => {
            this.setState({salDetails: res.data});
        });
        console.log(this.state.salDetails);
        
        const sd = 'EmpId '+this.state.salDetails.empId+', Emp TaxSlab '+this.state.salDetails.empTaxslab+', Emp Primary Income '+this.state.salDetails.empPrimaryIncome+', Emp Taxable Amount '+ this.state.salDetails.empTaxableAmount;
        this.setState({
            salData: sd
        });
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    submit = (employeeid) => {
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {this.deleteEmployee(employeeid)}
            },
            {
              label: 'No',
              onClick: () => {}
            }
          ]
        })
      };


    render() {
        const empDetails = this.state.empDetails;
        return (
            <div>
                 <h2 className="text-center">Employees List</h2>
                 <div className = "row">
                    <button className="btn btn-sm btn-primary" onClick={this.addEmployee}> Add Employee</button>
                 </div>
                 <br></br>
                 <div className = "row table-responsive" style={{maxHeight:'400px',textAlign:'center', fontSize:'16px'}} >
                        <table className = "table table-sm table-striped table-bordered" style={{verticalAlign:'middle'}}>
                            <thead>
                                <tr>
                                    <th> Employee First Name</th>
                                    <th> Employee Last Name</th>
                                    <th> Employee Email Id</th>
                                    <th> Employee Phone Number</th>
                                    <th> Employee Designation</th>
                                    <th> Employee State</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                             <td> <button className="btn btn-link" style={{padding:'0',textDecoration:'none'}} onClick={() => {this.getEmpDetails(employee.id)}}>{ employee.firstName}</button></td>   
                                             <td> {employee.lastName}</td>
                                             <td> {employee.emailId}</td>
                                             <td> {employee.phoneNumber}</td>
                                             <td> {employee.empDesignation}</td>
                                             <td> {employee.empState}</td>
                                             <td>
                                                 <button onClick={ () => this.viewEmployee(employee.id)} title="View Employee" className="btn btn-sm btn-success"><i className="fa fa-eye"></i></button>
                                                 <button style={{marginLeft: "10px"}} title="Update Employee"  onClick={ () => this.editEmployee(employee.id)} className="btn btn-sm btn-info"><i className="fa fa-refresh" aria-hidden="true"></i></button>
                                                 <button style={{marginLeft: "10px"}} title="Delete Employee" onClick={ () => {this.submit(employee.id) } } className="btn btn-sm btn-danger"><i className="fa fa-trash"></i></button> 
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                 </div>
                 
                 <div className="block worksBlock">
                <div className="container-fluid">
                    <Modal
                        style={{minWidth:'1000px'}}
                        title="Employee Details"
                        closeIcon='X'
                        open={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <div className = "row table-responsive" style={{maxHeight:'400px',textAlign:'center', fontSize:'13px'}} >
                            <table className="table table-sm table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th> Employee Id</th>
                                        <th> Employee Designation</th>
                                        <th> Employee Salary</th>
                                        <th> Employee Address 1</th>
                                        <th> Employee Address 2</th>
                                        <th> Employee Annual Income</th>
                                        <th> Employee State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        empDetails !== ""? (
                                        <tr key={this.state.empDetails.id}>
                                            <td>{this.state.empDetails.empId}</td>
                                            <td>{this.state.empDetails.empDesignation}</td>
                                            <td><span style={{color:'gray',cursor:'pointer'}} title={this.state.salData} onClick={()=>this.getSalaryDetails(this.state.empDetails.empId)}>{this.state.empDetails.empSalary}</span></td>
                                            <td>{this.state.empDetails.empAddress1}</td>
                                            <td>{this.state.empDetails.empAddress2}</td>
                                            <td>{this.state.empDetails.empAnnualIncome}</td>
                                            <td>{this.state.empDetails.empState}</td>
                                        </tr>
                                        ) : (
                                        <tr>
                                            <td colSpan={7}><center>No Data found</center></td>
                                        </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Modal>
                </div>

            </div>


            </div>
        )
    }
}

export default ListEmployeeComponent
