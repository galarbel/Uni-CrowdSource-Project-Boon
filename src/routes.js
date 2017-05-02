import React from "react";
import {Route, IndexRoute, IndexRedirect} from "react-router";
import App from "./components/App";
import ProjectInfo from "./components/ProjectInfo";
import ApproveRequestsPage from "./components/web/approveRequests/ApproveRequestsPage";
import CreateRequestPage from "./components/web/createRequest/CreateRequestPage";
import MyRequestsPage from "./components/web/myRequests/MyRequestsPage";
import ReportsPage from "./components/web/reports/ReportsPage";
import MobileContainer from "./components/mobile/MobileContainer";
import CreateRequestMobile from "./components/mobile/createRequest/CreateRequestPage";
import MyRequestsMobile from "./components/mobile/myRequests/MyRequestsPage";
import AbsencesSummaryMobile from "./components/mobile/AbsencesSummary";
import AbsenceRelatedInfo from "./components/mobile/common/AbsenceRelatedInfo";
import ApproveRequests from "./components/mobile/approveRequests/ApproveRequestsPage";
import ApproveRequestDetails from "./components/mobile/approveRequests/RequestDetails";
import RequestDetails from "./components/mobile/myRequests/RequestDetails";

export const desktopRoutes = (
    <Route path="/" component={App}>
        <IndexRedirect to="/create" />
        <Route path="projectInfo" component={ProjectInfo} />
        <Route path="create" component={CreateRequestPage} />
        <Route path="requests" component={MyRequestsPage} />
        <Route path="approve" component={ApproveRequestsPage} />
        <Route path="reports" component={ReportsPage} />
    </Route>
);

export const mobileRoutes = (
    <Route path="/" component={App}>
        <IndexRedirect to="/create"/>
        <Route component={MobileContainer} >
            <Route path="/create" component={CreateRequestMobile} />
            <Route path="/requests" component={MyRequestsMobile} />
            <Route path="/requests/:requestNumber" component={RequestDetails} />
            <Route path="/summary" component={AbsencesSummaryMobile} />
            <Route path="/info" component={AbsenceRelatedInfo} />
            <Route path="/approve" component={ApproveRequests} />
            <Route path="/approve/details/:categoryId/:requestNumber/:employeeNumber" component={ApproveRequestDetails} />
        </Route>
    </Route>
);
