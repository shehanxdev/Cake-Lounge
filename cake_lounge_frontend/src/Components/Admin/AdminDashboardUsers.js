import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
//Material UI imports
/*Table imports */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
/*Backdrop imports */
import Backdrop from "@mui/material/Backdrop";
import { Avatar, Button, IconButton, InputBase } from "@mui/material";
/*Icons */
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
//gif
import ArrowGif from "../../Assets/left-arrow.gif";
//SweetAlert import
import Swal from "sweetalert2";

function AdminDashboardUsers(props) {
  const [allShops, setAllShops] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [currentUser, setCurentUser] = useState(null);
  const search = useRef(null);
  const rows = [];
  /*backdrop handlers for delte*/
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  const handleDeleteToggle = () => {
    setDeleteOpen(!open);
  };
  /*backdrop handlers for edit*/
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  /*Edit handler */
  const editUser = async (user) => {
    await axios
      .post("http://localhost:8080/admin/dashboard/users/edit", { user: user })
      .then((result) => {
        setAllShops(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /*Delete handler */
  const deleteUser = async (user) => {
    console.log("this", user);
    await axios
      .post("http://localhost:8080/admin/dashboard/users/delete", {
        user: user,
      })
      .then((result) => {
        setAllShops(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //handle clicks on table rows
  const handleClickRow = (user) => {
    setCurentUser(user);
  };

  const handleSearchChange = (event) => {
    event.preventDefault();
    search.current = event.target.value;
  };

  //this methods handles the search submit operation
  const handleSearchSubmit = (event) => {
    //alert(search.current);
    event.preventDefault();
    console.log(search.current);
    searchShop();
  };
  //Logic for searching a user input
  const searchShop = () => {
    if (allShops != null) {
      let ArrLength = allShops.length - 1;
      for (let i = 0; i < allShops.length; ++i) {
        if (search.current == allShops[i].name) {
          setCurentUser(allShops[i]);
          break;
        } else {
          if (i == ArrLength) {
            Swal.fire("Search Failed?", "No match was found", "question");
          }
        }
      }
    }
  };
  //use Effect for fetching data
  useEffect(() => {
    const fetchAllUsers = async () => {
      return new Promise(async (resolve, reject) => {
        await axios
          .post("http://localhost:8080/admin/dashboard/users", {})
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
    fetchAllUsers()
      .then((result) => {
        setAllShops(result.data.resultedAllShops);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [allShops]);

  //conditional rendering
  if (allShops != null && currentUser == null) {
    return (
      <div className="d-flex flex-column flex-grow-1 admin_dashboard_overview_container">
        <Paper
          className="mt-4 shadow border"
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 600,
            margin: "auto",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            onChange={(event) => {
              handleSearchChange(event);
            }}
            placeholder="Search Shops"
            inputProps={{ "aria-label": "search shops" }}
          />
          <IconButton
            type="submit"
            sx={{ p: "10px", backgroundColor: "white !important" }}
            aria-label="search"
            ref={search}
            onClick={(event) => {
              handleSearchSubmit(event);
            }}
          >
            <SearchIcon sx={{ color: "black" }} />
          </IconButton>
        </Paper>
        <div className="p-4 d-flex   flex-grow-1 mt-4 d-inline-block">
          <div className="px-2" style={{ height: 800, width: "80%" }}>
            <TableContainer className="rounded-3" component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="text-white bg-dark">
                      Shop ID
                    </TableCell>
                    <TableCell className="text-white bg-dark" align="center">
                      Owner ID
                    </TableCell>
                    <TableCell className="text-white bg-dark" align="center">
                      Shop Name
                    </TableCell>
                    <TableCell className="text-white bg-dark" align="center">
                      Rank
                    </TableCell>
                    <TableCell className="text-white bg-dark" align="center">
                      Blocked Status
                    </TableCell>

                    <TableCell className="text-white bg-primary" align="center">
                      Edit
                    </TableCell>
                    <TableCell className="text-white bg-danger" align="center">
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allShops.map((row) => (
                    <TableRow
                      onClick={() => {
                        handleClickRow(row);
                      }}
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": { backgroundColor: "#ff5c8d" },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.shopID}
                      </TableCell>
                      <TableCell align="center">{row.ownerID}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.rank}</TableCell>
                      <TableCell align="center">
                        {JSON.stringify(row.blockedStatus)}
                      </TableCell>
                      <TableCell align="center">
                        {
                          <EditIcon
                            onClick={() => {
                              handleToggle();
                              setCurentUser(row);
                            }}
                            color="primary"
                          />
                        }
                      </TableCell>
                      <TableCell align="center">
                        {
                          <DeleteIcon
                            sx={{ color: "#ff0000" }}
                            onClick={() => {
                              handleDeleteToggle();
                              setCurentUser(row);
                            }}
                          />
                        }
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell>&zwnj; </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>&zwnj; </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>&zwnj; </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>&zwnj; </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>&zwnj; </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>&zwnj; </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="custom_admin_dashboard_all_users_preview border shadow p-2 mb-5 mx-3 pt-3 d-flex flex-column justify-content-center align-items-center">
            <img style={{ width: "100px" }} src={ArrowGif} alt="" />
            <h1 className="h1 text-center">
              select a shop <br /> to view details
            </h1>
          </div>
        </div>
      </div>
    );
  } else if (allShops != null && currentUser != null) {
    return (
      <div className="d-flex flex-column flex-grow-1 admin_dashboard_overview_container">
        <Paper
          className="mt-4 shadow border"
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 600,
            margin: "auto",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            onChange={(event) => {
              handleSearchChange(event);
            }}
            placeholder="Search Shops"
            inputProps={{ "aria-label": "search shops" }}
          />
          <IconButton
            type="submit"
            onClick={(event) => {
              handleSearchSubmit(event);
            }}
            sx={{ p: "10px", backgroundColor: "white !important" }}
            aria-label="search"
          >
            <SearchIcon sx={{ color: "black" }} />
          </IconButton>
        </Paper>
        <div className="p-4 d-flex  flex-grow-1 mt-4 d-inline-block">
          <div className="px-2" style={{ height: 800, width: "80%" }}>
            <TableContainer className="rounded-3" component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="text-white bg-dark">
                      Shop ID
                    </TableCell>
                    <TableCell className="text-white bg-dark" align="center">
                      Owner ID
                    </TableCell>
                    <TableCell className="text-white bg-dark" align="center">
                      Shop Name
                    </TableCell>
                    <TableCell className="text-white bg-dark" align="center">
                      Rank
                    </TableCell>
                    <TableCell className="text-white bg-dark" align="center">
                      Blocked Status
                    </TableCell>

                    <TableCell className="text-white bg-primary" align="center">
                      Edit
                    </TableCell>
                    <TableCell className="text-white bg-danger" align="center">
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allShops.map((row) => (
                    <TableRow
                      onClick={() => {
                        handleClickRow(row);
                      }}
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": { backgroundColor: "#ff5c8d" },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.shopID}
                      </TableCell>
                      <TableCell align="center">{row.ownerID}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.rank}</TableCell>
                      <TableCell align="center">
                        {JSON.stringify(row.blockedStatus)}
                      </TableCell>
                      <TableCell align="center">
                        {
                          <EditIcon
                            onClick={() => {
                              handleToggle();
                              setCurentUser(row);
                            }}
                            color="primary"
                          />
                        }
                      </TableCell>
                      <TableCell align="center">
                        {
                          <DeleteIcon
                            sx={{ color: "#ff0000" }}
                            onClick={() => {
                              handleDeleteToggle();
                              setCurentUser(row);
                            }}
                          />
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>&zwnj; </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>&zwnj; </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>&zwnj; </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>&zwnj; </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>&zwnj; </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>&zwnj; </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <div className="d-flex flex-column">
                <span className="d-block p-3">
                  Are you sure you want to block the {currentUser.shopID} ?
                </span>
                <Button
                  onClick={() => {
                    editUser(currentUser);
                  }}
                  className="mb-3"
                  variant="contained"
                >
                  Block / Unblock the user
                </Button>
                <Button color="success" variant="contained">
                  Cancel
                </Button>
              </div>
            </Backdrop>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={deleteOpen}
              onClick={handleDeleteClose}
            >
              <div className="d-flex flex-column">
                <span className="d-block p-3">
                  Are you sure you want to block the {currentUser.shopID} ?
                </span>
                <Button
                  sx={{ backgroundColor: "red" }}
                  className="mb-3 custom_admin_dashboard_delete_button"
                  variant="contained"
                  onClick={() => {
                    deleteUser(currentUser);
                  }}
                >
                  Delete the user
                </Button>
                <Button color="primary" variant="contained">
                  Cancel
                </Button>
              </div>
            </Backdrop>
          </div>
          <div className="custom_admin_dashboard_all_users_preview border shadow p-2 mb-5 mx-3 pt-3 ">
            <h2 className="h2 text-center text-primary my-4">Seller Profile</h2>
            <Avatar
              className="m-auto"
              sx={{ width: 220, height: 220 }}
              src={currentUser.appearance.prop_pic}
            />
            <span className="d-block h5 text-center mt-5 ">
              Shop ID: <br /> <b className="h3">{currentUser.shopID}</b>
            </span>
            <span className="d-block h5 text-center mt-5 ">
              Shop Name: <br /> <b className="h3">{currentUser.name}</b>
            </span>
            <span className="d-block h5 text-center mt-5 ">
              Owner ID: <br /> <b className="h3">{currentUser.ownerID}</b>
            </span>
            <span className="d-block h5 text-center mt-5 mb-3">
              Contact E-mail: <br />{" "}
              <b className="h3">{currentUser.contact.email}</b>
            </span>
            <Button className="w-50 m-auto d-block mb-4 mt-5">
              <span style={{ fontSize: "18px" }}>Contact</span>
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="admin_dashboard_overview_container">
        <h1>Loading.....</h1>
      </div>
    );
  }
}
export default AdminDashboardUsers;
