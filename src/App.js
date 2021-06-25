import "./App.css";
import { connect } from "react-redux";
import { myaction } from "./Actions/action";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  InputBase,
  makeStyles,
  Paper,
  Tab,
  TableContainer,
  TablePagination,
  Tabs,
  Toolbar,
  Typography,
  withStyles,
  Button,
  CircularProgress,
} from "@material-ui/core";
import {
  Bitfinex,
  SearchIcon,
  CancelIcon,
  TradingIcon,
  TradingGraph,
} from "./Styles/Icons";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
const CssAppbar = withStyles({
  root: {
    "& .MuiToolbar-dense": {
      height: "100%",
    },
  },
})(AppBar);
const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#fff",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);
const CssTablePagination = withStyles({
  root: {
    "& .MuiSelect-icon": {
      color: "white",
    },
    "& .MuiIconButton-root.Mui-disabled": {
      color: "white",
      padding: "0",
    },
    "& .MuiTablePagination-toolbar": {
      minHeight: "30px",
    },
  },
})(TablePagination);
const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    fontWeight: "bold",
    "& > span": {
      maxWidth: "70px",
      minWidth: "60.99px",
      width: "100%",
      backgroundColor: "white",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography
            style={{
              margin: "0 -24px 0 -24px",
              height: "100%",
              padding: "0 2px",
            }}
          >
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}
const columns = [
  { id: "0", label: "NAME", minWidth: "25%" },
  { id: "7", label: "LAST", minWidth: "25%" },
  { id: "9", label: "24H", minWidth: "25%" },
  { id: "8", label: "Vol USD", minWidth: "25%" },
];
const style = {
  textStyle: (color, underline) => ({
    width: "100%",
    color: color ? color : "white",
    fontSize: "0.8rem",
    textAlign: "left",
    textDecoration: underline ? "underline" : "none",
  }),
};
const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  container: {
    height: "calc(100% - 48px)",
    width: "100%",
    padding: "0",
    marginBottom: "5px",
  },
});
function App(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("trading");
  const [selectedApiValue, setSelectedApiValue] = React.useState([]);
  const [apidata, setapidata] = React.useState(
    props.apiData
      ? props.apiData.filter((data) => data[0].slice(0, 1) === "t")
      : []
  );
  const [copyapidata, setCopyapidata] = React.useState(
    props.apidata ? props.apiData : []
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchBarValue, setSearchBarValue] = React.useState("");
  useEffect(() => {
    // let timer1 = setInterval(() => props.changeName(), 2 * 1000);
    // return () => {
    //   clearTimeout(timer1);
    // };
    props.changeName();
  }, []);
  useEffect(() => {
    if (!props.loading) {
      const filterValue =
        props.apiData &&
        props.apiData.filter(
          (data) => data[0].slice(0, 1) === value.slice(0, 1)
        );
      setSelectedApiValue(props.apiData[0]);
      setapidata(filterValue);
      setCopyapidata(props.apiData);
    }
  }, [props.apiData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="App">
      <div className="appbar">
        <CssAppbar
          position="static"
          style={{ backgroundColor: "#1b262d", height: "100%" }}
        >
          <Toolbar variant="dense">
            <Bitfinex />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                style={{
                  color: "#01a781",
                  borderColor: "#01a781",
                  textTransform: "capitalize",
                }}
                onClick={() => {
                  props.changeName();
                }}
              >
                Reconnect
              </Button>
            </div>
          </Toolbar>
        </CssAppbar>
      </div>
      <div className="mainDiv">
        <div className="leftDiv">
          {" "}
          <div
            style={{
              // border: "1px solid #23313a",
              width: "100%",
              height: "calc(100% - 2px)",
            }}
          >
            {" "}
            <div
              style={{
                border: "1px solid #23313a",
                width: "100%",
                height: "86px",
                marginBottom: "10px",
                backgroundColor: "#1b262d",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {" "}
              <div style={{ padding: "7px", width: "54px" }}>
                <TradingIcon />
              </div>
              <div
                style={{
                  padding: "7px",
                  width: "calc(100% - 54px)",
                  display: "flex",
                  height: "calc(100% - 14px)",
                }}
              >
                {props.loading && props.loading ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress
                      style={{ color: "white", height: "35px", width: "35px" }}
                    />
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        minWidth: "47%",
                        maxWidth: "47%",
                        marginRight: "10px",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span style={style.textStyle("white", "underline")}>
                        {selectedApiValue &&
                          selectedApiValue[0] &&
                          `
                     ${selectedApiValue[0].slice(
                       1,
                       4
                     )} /${selectedApiValue[0].slice(4)}`}
                      </span>{" "}
                      <span style={style.textStyle()}>
                        {selectedApiValue && `Vol ${selectedApiValue[6]} USD`}
                      </span>{" "}
                      <span style={style.textStyle("#f05359")}>
                        {selectedApiValue && `LOW ${selectedApiValue[10]}`}
                      </span>{" "}
                      <span style={style.textStyle()}>
                        {selectedApiValue &&
                          selectedApiValue[0] &&
                          `Your
                     ${selectedApiValue[0].slice(
                       1,
                       4
                     )} /${selectedApiValue[0].slice(4)} rank`}{" "}
                      </span>
                    </div>
                    <div
                      style={{
                        minWidth: "47%",
                        maxWidth: "47%",
                        marginRight: "10px",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span style={style.textStyle()}>
                        {" "}
                        {selectedApiValue && `${selectedApiValue[3]}`}
                      </span>{" "}
                      {/* <span style={style.textStyle("red")}>LOW</span>{" "} */}
                      <span style={style.textStyle("#01a781")}>
                        {selectedApiValue && `HIGH ${selectedApiValue[9]}`}
                      </span>{" "}
                      <span
                        style={{
                          width: "100%",
                          textAlign: "right",
                          color: "white",
                          padding: "0 5px 0 0",
                        }}
                      >
                        N/A
                      </span>{" "}
                    </div>{" "}
                  </>
                )}
                <div
                  style={{
                    minWidth: "calc(6% - 20px)",
                    height: "86px",
                    maxWidth: "calc(6% - 20px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TradingGraph />
                </div>
              </div>
            </div>{" "}
            <div
              style={{
                border: "1px solid #23313a",
                width: "100%",
                height: "calc(100% - 98px)",
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid rgba(100, 100, 100, 0.3)",
                  width: "100%",
                  height: "49px",
                  marginBottom: "5px",
                  backgroundColor: "#1b262d",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    textTransform: "uppercase",
                    lineHeight: "20px",
                    color: "white",
                    fontWeight: "bold",
                    width: "fit-content",
                    marginLeft: "17.25px",
                  }}
                >
                  Tickers
                </span>{" "}
                <div
                  style={{
                    width: "calc(100% - 80px)",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                >
                  <Paper
                    style={{
                      width: "40%",
                      margin: "7px 10px 7px 5px",
                      borderRadius: "0",
                      display: "flex",
                      backgroundColor: "#273640",
                      height: "35px",
                    }}
                    elevation={3}
                    component="form"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0 12px",
                      }}
                    >
                      <SearchIcon />
                    </div>
                    <InputBase
                      style={{ width: "100%", color: "white" }}
                      placeholder={"Search !!"}
                      inputProps={{ "aria-label": "search google maps" }}
                      onKeyPress={(ev) => {
                        if (ev.key === "Enter") {
                          ev.preventDefault();
                        }
                      }}
                      onChange={(event) => {
                        setSearchBarValue(event.target.value);
                        const filteredApidata = [];
                        copyapidata.map((data) => {
                          if (
                            data[0]
                              .slice(1, 4)
                              .toString()
                              .toLowerCase()
                              .includes(
                                event.target.value.toString().toLowerCase()
                              )
                          ) {
                            if (!filteredApidata.includes(data)) {
                              filteredApidata.push(data);
                            }
                          }
                          
                        });
                        
                        setapidata(filteredApidata);
                      }}
                      value={searchBarValue}
                    />{" "}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0 9.5px",
                        cursor: "pointer",
                      }}
                    >
                      <Avatar
                        onClick={(event) => {
                          setSearchBarValue("");
                          setapidata(copyapidata);
                        }}
                        style={{
                          color: "white",
                          backgroundColor: "#1b262d",
                          borderRadius: "50%",
                          width: "18px",
                          height: "18px",
                          fontSize: "0.7rem",
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CancelIcon />
                      </Avatar>
                    </div>
                  </Paper>
                </div>{" "}
              </div>{" "}
              <AppBar
                style={{
                  boxShadow: "none",
                  borderBottom: "none",
                  width: "100%",
                  backgroundColor: "#1b262d",
                  height: "40px",
                  marginBottom: "10px",
                }}
                position="static"
              >
                <StyledTabs
                  style={{
                    marginLeft: "17.25px",
                    backgroundColor: "#1b262d",
                    minHeight: "0",
                  }}
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  aria-label="wrapped label tabs example"
                >
                  <StyledTab
                    onClick={() => {
                      const filterValue =
                        copyapidata &&
                        copyapidata.filter(
                          (data) => data[0].slice(0, 1) === "t"
                        );
                      setapidata(filterValue);
                    }}
                    style={{
                      fontSize: "0.8rem",
                      width: "60px",
                      minWidth: "fit-content",
                      maxWidth: "60px",
                      textTransform: "capitalize",
                      padding: "0",
                      margin: "0 20px 0 0",
                    }}
                    value={"trading"}
                    label={"Trading"}
                    wrapped
                    {...a11yProps("trading")}
                  />{" "}
                  <StyledTab
                    onClick={() => {
                      const filterValue =
                        copyapidata &&
                        copyapidata.filter(
                          (data) => data[0].slice(0, 1) === "f"
                        );
                      setapidata(filterValue);
                    }}
                    style={{
                      fontSize: "0.8rem",
                      width: "60px",
                      minWidth: "fit-content",
                      maxWidth: "60px",
                      textTransform: "capitalize",
                      padding: "0",
                      margin: "0 0 0 20px",
                    }}
                    value={"funding"}
                    label={"Funding"}
                    wrapped
                    {...a11yProps("funding")}
                  />
                </StyledTabs>
              </AppBar>
              <div
                style={{
                  width: "100%",
                  height: "calc(100% - 105px)",
                  backgroundColor: "#1b262d",
                }}
              >
                {" "}
                <TableContainer className={classes.container}>
                  <div style={{ width: "100%", height: "100%" }}>
                    <div
                      style={{ width: "100%", display: "flex", height: "48px" }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          padding: "15px",
                          height: "100%",
                        }}
                      >
                        {columns.map((column) => (
                          <div
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              fontWeight: "bold",
                              color: "white",
                            }}
                          >
                            {column.label}
                          </div>
                        ))}
                      </div>
                    </div>{" "}
                    <Divider style={{ width: "100%" }} />
                    <div
                      className="thinList"
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        height: "calc(100% - 49px)",
                        overflowY: "auto",
                      }}
                    >
                      {props.loading && props.loading ? (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress style={{ color: "white" }} />
                        </div>
                      ) : apidata && apidata.length > 0 ? (
                        apidata
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => {
                            return (
                              <>
                                <div
                                  onClick={() => {
                                    setSelectedApiValue(row);
                                  }}
                                  style={{ width: "100%", display: "flex" }}
                                  key={row.code}
                                >
                                  {columns.map((column, i) => {
                                    const value = row[column.id];
                                    return (
                                      <div
                                        key={column.id}
                                        style={{
                                          margin: "15px",
                                          minWidth: `calc(${column.minWidth} - 30px)`,
                                          overflow: "hidden",
                                          color: "white",
                                        }}
                                      >
                                        {i === 1
                                          ? `${value} ${row[0].slice(4)}`
                                          : i === 0
                                          ? value.slice(1, 4)
                                          : value}
                                      </div>
                                    );
                                  })}
                                </div>
                                <Divider style={{ width: "100%" }} />
                              </>
                            );
                          })
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "canter",
                          }}
                        >
                          <span
                            style={{
                              color: "white",
                              padding: "15px 0 0 0",
                              width: "100%",
                            }}
                          >
                            No elements to show.
                          </span>
                        </div>
                      )}
                      43
                    </div>
                  </div>
                </TableContainer>
                <CssTablePagination
                  style={{
                    width: "calc(100% - 10px)",
                    padding: "0",
                    margin: "0 10px 0 0",
                    minHeight: "30px",
                    color: "white",
                  }}
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={apidata.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    apiData: state.data,
    loading: state.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeName: () => {
      dispatch(myaction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
