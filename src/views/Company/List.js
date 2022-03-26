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

export default function Company() {
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
              <h4 className={classes.cardIconTitle}>Lista de empresas</h4>
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
      <Dialog
        fullWidth
        maxWidth="lg"
        open={modal}
        className={classes.dialog}
        onClose={() => setModal(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent className={classes.dialogContent}>
          <GridContainer>
            <GridItem lg={12} xs={12} sm={12} md={12}>
              <Card>
                <CardHeader className={classes.topPage} color="success" icon>
                  <CardIcon color="success">
                    <Assignment />
                  </CardIcon>
                  <h4 className={classes.cardTitleWhite}>Cadastrar Empresa</h4>
                </CardHeader>
                <CardBody>
                  <SnackbarContent
                    color="success"
                    message="Dados da Empresa"
                    className={classes.bottomContent}
                  />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                        id="razao-social"
                        labelText="Razão Social"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        id="nome-fantasia"
                        labelText="Nome Fantasia"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        id="cnpj"
                        labelText="CNPJ"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        success={emailState === "success"}
                        error={emailState === "error"}
                        labelText="E-mail"
                        name="email"
                        id="email"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          onChange: (event) => {
                            verifyEmail(event.target.value)
                              ? setEmailState("success")
                              : setEmailState("error");
                            setEmail(event.target.value);
                          },
                          type: "email",
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        // success={telephoneState === "success"}
                        // error={telephoneState === "error"}
                        labelText="Telefone"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          id: "telephone",
                          name: "telephone",
                          // onChange: (event: any) => {
                          //   event.target.value.replace(
                          //     /^(\d{2})?\s*?(\d{4,5})(\d{4})/g,
                          //     "($1) $2-$3"
                          //   );
                          // }
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        id="data-constituicao"
                        labelText="Data Constituição"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        id="cep"
                        labelText="CEP"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        id="uf"
                        labelText="UF"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        id="cidade"
                        labelText="Cidade"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        id="logradouro"
                        labelText="Logradouro"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <CustomInput
                        id="numero"
                        labelText="Número"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <CustomInput
                        id="complemento"
                        labelText="Complemento"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        id="bairro"
                        labelText="Bairro"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        id="about-me"
                        labelText="Atividade(s) desenvolvida(s)"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{ multiline: true, rows: 5 }}
                      />
                    </GridItem>
                  </GridContainer>
                  <SnackbarContent
                    color="success"
                    message="Dados Bancários"
                    className={classes.bottomContent}
                  />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        id="banco"
                        labelText="Banco"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        id="agencia"
                        labelText="Agência"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        id="conta"
                        labelText="Conta"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                  </GridContainer>
                  <SnackbarContent
                    color="success"
                    message="Beneficiários Finais"
                    className={classes.bottomContent}
                  />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        id="nome"
                        labelText="Nome"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        id="cpf"
                        labelText="CPF"
                        formControlProps={{ fullWidth: true }}
                      />
                    </GridItem>
                  </GridContainer>
                  <SnackbarContent
                    color="success"
                    message="Sócios"
                    className={classes.bottomContent}
                  />
                </CardBody>
                <CardFooter>
                  <Button onClick={() => setModal(false)}>Cancelar</Button>
                  <Button
                    type="button"
                    color="success"
                    variant="outlined"
                    onClick={() => setModal(false)}
                  >
                    Salvar
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}
