import React, { Component } from "react";
import firebase from "./firestore";
import NavigationJH from "./NavigationJH";
import SignatureCanvas from "react-signature-canvas";

const db = firebase.firestore();
const refDoc = db.collection("docket");

var testy;

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
      sComment: "",
      signature: ""
    };
    this.docketStatus = this.docketStatus.bind(this);

  }

  sigPad = {};

  readPad = {testy};

  clear = () => {
    this.sigPad.clear();
  };

  toData = () => {
    this.setState({
      signature: this.sigPad.toData().flat()
    });
  };

  fromData = () => {
    return this.readPad.fromData(this.state.signature)
  }

  docketStatus = e => {
    refDoc.doc(this.props.userID).update({
      status: this.state.status,
      supervisorComment: this.state.sComment,
      signature: this.state.signature
    });
  };

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="confirmation__red">
        <NavigationJH pageName="Confirmation" />

        <div className="confirmation">
          <div className="welcome">
            <h2 class="welcome-text">
              Confrim docket:{" "}
              <span class="welcome-text-color purple">${this.state.sum}</span>
            </h2>
          </div>

          <div class="confirmation__main">
            <div class="title__container">
              <h4 className="title__text">Add Notes</h4>
            </div>
            <br />
            <textarea
              name="Confirmation__sComment"
              className="confirmation__sComment"
              id="sComment"
              // cols="30"
              rows="5"
              value={this.state.comment}
              onChange={this.updateInput}
              placeholder="Enter comments here..."
            />
            <div class="title__container">
              <h4 className="title__text">Signature</h4>
            </div>
            <br />
            <div className="sig">
              <SignatureCanvas
                penColor="black"
                minWidth="0.8"
                maxWidth="0.8"
                canvasProps={{
                  // width: 200,
                  // height: 200,
                  className: "sig__Canvas"
                }}
                ref={ref => {
                  this.sigPad = ref;
                }}
              />

              <SignatureCanvas
                penColor="black"
                minWidth="0.8"
                maxWidth="0.8"
                canvasProps={{
                  // width: 200,
                  // height: 200,
                  className: "sig__Canvas"
                }}
                ref={ref => {
                  this.readPad = ref;
                }}
              />
            </div>
            <button onClick={this.clear}>Clear canvas</button>
            <button onClick={this.toData}>To Data</button>
            <button onClick={this.fromData}>Frommmmmmm Data</button>
            <button onClick={this.docketStatus}>hello</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirmation;
