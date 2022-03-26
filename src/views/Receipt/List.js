/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

// @material-ui/core components
import { makeStyles, Dialog, DialogContent } from "@material-ui/core";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import ReactTable from "components/ReactTable/ReactTable.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import { cardTitle } from "assets/jss/material-react.js";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
    width: "90%",
  },
  topPage: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
  },
};

const useStyles = makeStyles(styles);

export default function Receipt() {
  const [modal, setModal] = useState(false);

  /** verify e-mail validation */
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState("");
  const verifyEmail = (value) => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };

  const dataTable = {
    dataRows: [],
  };

  const req = axios
    .get("https://apiqa.kikaipay.com.br/api/v1/company-admin/list")
    .then((res) => {
      const company = res.data;
      this.setState({ company });
    });

  const [data, setData] = useState(
    dataTable.dataRows.map((prop, key) => {
      return {
        id: key,
        name: prop[0],
        position: prop[1],
        office: prop[2],
        age: prop[3],
        actions: (
          <div className="actions-right">
            <Button
              justIcon
              round
              simple
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                alert(
                  "You've clicked LIKE button on \n{ \nName: " +
                    obj.name +
                    ", \nposition: " +
                    obj.position +
                    ", \noffice: " +
                    obj.office +
                    ", \nage: " +
                    obj.age +
                    "\n}."
                );
              }}
              color="info"
              className="like"
            >
              <Favorite />
            </Button>{" "}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                alert(
                  "You've clicked EDIT button on \n{ \nName: " +
                    obj.name +
                    ", \nposition: " +
                    obj.position +
                    ", \noffice: " +
                    obj.office +
                    ", \nage: " +
                    obj.age +
                    "\n}."
                );
              }}
              color="warning"
              className="edit"
            >
              <Dvr />
            </Button>{" "}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                var newData = data;
                newData.find((o, i) => {
                  if (o.id === key) {
                    newData.splice(i, 1);
                    return true;
                  }
                  return false;
                });
                setData([...newData]);
              }}
              color="danger"
              className="remove"
            >
              <Close />
            </Button>{" "}
          </div>
        ),
      };
    })
  );
  const classes = useStyles();
  return (
    <>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader className={classes.topPage} color="primary" icon>
              <CardIcon color="success">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Lista de recebimentos</h4>
              <Button color="success" onClick={() => setModal(true)}>
                Cadastrar
              </Button>
            </CardHeader>
            <CardBody>
              <ReactTable
                columns={[
                  {
                    Header: "Criado",
                    accessor: "criado",
                  },
                  {
                    Header: "Ult. Prazo",
                    accessor: "ultPrazo",
                  },
                  {
                    Header: "Razão Social",
                    accessor: "razaoSocial",
                  },
                  {
                    Header: "Nome Fantasia",
                    accessor: "nomeFantasia",
                  },
                  {
                    Header: "CNPJ",
                    accessor: "cnpj",
                  },
                  {
                    Header: "Telefone",
                    accessor: "telefone",
                  },
                  {
                    Header: "Status",
                    accessor: "status",
                  },
                ]}
                data={data}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
