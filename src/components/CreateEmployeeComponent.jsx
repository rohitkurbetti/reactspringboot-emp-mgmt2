import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
            phone: '',
            empDesignation: '',
            empSalary: '',
            empAddress1: '',
            empAddress2: '',
            empAnnualIncome: '',
            empState: '',
            empTaxslab: 0,
            empPrimaryIncome: false,
            empTaxableAmount: 0
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId : employee.emailId,
                    phone: employee.phoneNumber,
                    empDesignation: employee.empDesignation,
                    empSalary: employee.empSalary,
                    empAddress1: employee.empAddress1,
                    empAddress2: employee.empAddress2,
                    empAnnualIncome: employee.empAnnualIncome,
                    empState: employee.empState,
                    empTaxslab: employee.empTaxslab,
                    empPrimaryIncome: employee.empPrimaryIncome,
                    empTaxableAmount: employee.empTaxableAmount
                });
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId, phoneNumber: this.state.phone,
                                       empDesignation: this.state.empDesignation, empSalary: this.state.empSalary==null||this.state.empSalary==""?0:this.state.empSalary, empAddress1: this.state.empAddress1, empAddress2: this.state.empAddress2,
                                       empAnnualIncome: this.state.empAnnualIncome==null||this.state.empAnnualIncome=="" ?0:this.state.empAnnualIncome, empState: this.state.empState,
                                       empTaxslab: this.state.empTaxslab, empPrimaryIncome: this.state.empPrimaryIncome, empTaxableAmount: this.state.empTaxableAmount
        };
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }
    changePhoneNumHandler = (event) => {
        this.setState({phone: event.target.value});
    }

    changeDesignationHandler = (event) => {
        this.setState({empDesignation: event.target.value});
    }

    changeSalaryHandler = (event) => {
        this.setState({empSalary: event.target.value});
    }

    changeAddress1Handler = (event) => {
        this.setState({empAddress1: event.target.value});
    }

    changeAddress2Handler = (event) => {
        this.setState({empAddress2: event.target.value});
    }

    changeAnnIncomeHandler = (event) => {
        this.setState({empAnnualIncome: event.target.value});
    }

    changeStateHandler = (event) => {
        this.setState({empState: event.target.value});
    }

    changeTaxslabHandler = (event) => {
        this.setState({empTaxslab: event.target.value});
    }

    changePrimaryIncomeHandler = (event) => {
        const checked1 = event.target.checked;
        this.setState({empPrimaryIncome: checked1});
        console.log(checked1);
    }

    changeTaxableAmountHandler = (event) => {
        this.setState({empTaxableAmount: event.target.value});
    }


    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className="row">                                            
                                            <div className = "form-group mb-2 col">
                                                <label> First Name: </label>
                                                <input placeholder="First Name" name="firstName" className="form-control form-control-sm" 
                                                    value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                            </div>
                                            <div className = "form-group mb-2 col">
                                                <label> Last Name: </label>
                                                <input placeholder="Last Name" name="lastName" className="form-control form-control-sm" 
                                                    value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className = "form-group mb-2 col">
                                                <label> Email Id: </label>
                                                <input placeholder="Email Address" name="emailId" className="form-control form-control-sm" 
                                                    value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                            </div>
                                            <div className = "form-group mb-2 col">
                                                <label> Phone: </label>
                                                <input placeholder="Phone Number" name="phone" className="form-control form-control-sm" 
                                                    value={this.state.phone} onChange={this.changePhoneNumHandler}/>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="empDetails">
                                            <div className="row">                                            
                                                <div className = "form-group mb-2 col">
                                                    <label> Emp Designation: </label>
                                                    <input placeholder="Emp Designation" name="empDesignation" className="form-control form-control-sm" 
                                                        value={this.state.empDesignation} onChange={this.changeDesignationHandler} />
                                                </div>
                                                <div className = "form-group mb-2 col">
                                                    <label> Emp Salary: </label>
                                                    <input placeholder="Emp Salary" name="empSalary" className="form-control form-control-sm" 
                                                        value={this.state.empSalary} onChange={this.changeSalaryHandler}/>
                                                </div>
                                                
                                            </div>
                                            <div className='row'>
                                            <div className = "form-group mb-2 col">
                                                    <label> Emp Address1: </label>
                                                    <input placeholder="Emp Address1" name="empAddress1" className="form-control form-control-sm" 
                                                        value={this.state.empAddress1} onChange={this.changeAddress1Handler}/>
                                                </div>
                                                <div className = "form-group mb-2 col">
                                                    <label> Emp Address2: </label>
                                                    <input placeholder="Emp Address2" name="empAddress2" className="form-control form-control-sm" 
                                                        value={this.state.empAddress2} onChange={this.changeAddress2Handler}/>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className = "form-group mb-2 col">
                                                    <label> Emp Annual Income: </label>
                                                    <input placeholder="Emp Annual Income" name="empAnnualIncome" className="form-control form-control-sm" 
                                                        value={this.state.empAnnualIncome} onChange={this.changeAnnIncomeHandler}/>
                                                </div>
                                                <div className = "form-group mb-2 col">
                                                    <label> Emp State: </label>
                                                    <input placeholder="Emp State" name="empState" className="form-control form-control-sm" 
                                                        value={this.state.empState} onChange={this.changeStateHandler}/>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">                                            
                                            <div className = "form-group mb-2 col">
                                                <label> Emp Taxslab: </label>
                                                <input placeholder="Emp Taxslab" name="empTaxslab" className="form-control form-control-sm" 
                                                    value={this.state.empTaxslab} onChange={this.changeTaxslabHandler} />
                                            </div>
                                            <div className = "form-group  mb-2 col">
                                                <label> Emp Primary Income: </label>
                                                <input type="checkbox" className="form-check form-check-input" onChange={this.changePrimaryIncomeHandler} 
                                                    name="empPrimaryIncome" checked={this.state.empPrimaryIncome} id="exampleCheck1" />
                                            </div>
                                            <div className = "form-group mb-2 col">
                                                <label> Emp Taxable Amount: </label>
                                                <input placeholder="Emp Taxable Amount:" name="empTaxableAmount" className="form-control form-control-sm" 
                                                    value={this.state.empTaxableAmount} onChange={this.changeTaxableAmountHandler}/>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-sm btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                            <button className="btn btn-sm btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
