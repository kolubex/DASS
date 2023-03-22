import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ReportIcon from "@mui/icons-material/Report";
import UsersTable from "./users";
import SubRequests from "./requests";
import ReportsTable from "./reports";

const RootTabs = styled(Tabs)({
  position: "fixed",
  bottom: 0,
  width: "100%",
  backgroundColor: "#fff",
  boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
});

const RootTab = styled(Tab)({
  minWidth: 0,
});

function TabPanel(props) {
  const { children, value, index, onOpenTab, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function BottomTabs() {
  const [value, setValue] = useState(0);
  const [loaded, setloaded] = useState(false);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <div>
      
      <RootTabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <RootTab icon={<PersonIcon />} label="Users" />
        <RootTab icon={<AssignmentIcon />} label="Requests" />
        <RootTab icon={<ShowChartIcon />} label="Stats" />
        <RootTab icon={<ReportIcon />} label="Reports" />
      </RootTabs>
      <TabPanel value={value} index={0}>
        <UsersTable/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SubRequests/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Stats
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ReportsTable/>
      </TabPanel>
    </div>
  );
}

export default BottomTabs;