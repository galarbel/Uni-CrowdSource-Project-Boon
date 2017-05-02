export const dummyAbsenceTypes = [
    {
        name: "Vacation",
        id: "0100"
    },
    {
        name: "Sick / Accident",
        id: "0200"
    },
    {
        name: "Military Service",
        id: "0400"
    },
    {
        name: "Off-Site Work",
        id: "0500"
    }
];

export const dummyCalculatedDays = {
    // total: "5 Days"
    total: `${Math.ceil(10*Math.random())} Days` //return a String between '1 Days' and '10 Days'
};

export const dummyAbsenceRelatedInfo = {
    periodicAssignment: "1.83",
    periodicAssignmentPeriod: "Monthly",
    availableBalance: "10",
    futureBalanceAsOfDate: "21-Feb-2017",
    futureBalance: "11.83",
    unit: "Days"
};

export const dummyAbsencesSummary = {
    thisYear: [
        {
            category: "Military Service",
            unit: "Days",
            amount: "2"
        }
    ],
    lastYear: [
        {
            category: "Vacation",
            unit: "Days",
            amount: "11.5"
        },
        {
            category: "Sick / Accident",
            unit: "Days",
            amount: "4.5"
        }
    ],
    twoYearsAgo: [
        {
            category: "Vacation",
            unit: "Days",
            amount: "3.5"
        },
        {
            category: "Sick / Accident",
            unit: "Days",
            amount: "9.5"
        },
        {
            category: "Off-Site Work",
            unit: "Days",
            amount: "1"
        }
    ],
    approvedNotTaken: [
        {
            category: "Vacation",
            unit: "Days",
            amount: "0.5"
        }
    ]
};

export const dummyCreateRequest = {
    employeeName: "Sergey Pearlstein",
    employeeNumber: "00012416",
    number: "33580592001",
    category: "Vacation",
    categoryId: "0100",
    status: "Pending",
    isInDeletionCycle: false,
    total: "1 Day",
    dateFrom: "26-Feb-2017",
    dateTo: "26-Feb-2017",
    reason: "",
    insertDate: "23-Feb-2017",
    deletedBy: "",
    approvalCycle: null
};

export const dummyMyRequests = [
    {
        "number":"35466252001",
        "employeeName":"Gal Arbel",
        "employeeNumber":"00012471",
        "category":"Off-Site Work",
        "categoryId":"0500",
        "status":"Approved",
        "total":"0.5 Day",
        "dateFrom":"05-Dec-2017",
        "dateTo":"05-Dec-2017"
    },
    {
        "number":"34467712001",
        "employeeName":"Gal Arbel",
        "employeeNumber":"00012471",
        "category":"Vacation",
        "categoryId":"0100",
        "status":"Rejected",
        "total":"1 Day",
        "dateFrom":"03-Nov-2017",
        "dateTo":"03-Nov-2017"
    },
    {
        "number":"34580052001",
        "employeeName":"Gal Arbel",
        "employeeNumber":"00012471",
        "category":"Vacation",
        "categoryId":"0100",
        "status":"Rejected",
        "total":"1 Day",
        "dateFrom":"27-Oct-2017",
        "dateTo":"27-Oct-2017"
    }
];

export const dummyPendingRequests = [{"number":"36390382001","total":"7 Days","status":"Pending","dateFrom":"23-Mar-2017","dateTo":"02-Apr-2017","employeeNumber":"00006753","employeeName":"Yulian Abramovich","categoryId":"0100","category":"Vacation"},{"number":"36460012001","total":"2 Days","status":"Pending","dateFrom":"06-Mar-2017","dateTo":"07-Mar-2017","employeeNumber":"00012879","employeeName":"Nir Dagan","categoryId":"0400","category":"Military Service"},{"number":"36371142001","total":"1 Day","status":"Pending","dateFrom":"02-Mar-2017","dateTo":"02-Mar-2017","employeeNumber":"00006718","employeeName":"Ariel Keinan","categoryId":"0100","category":"Vacation"},{"number":"36321052001","total":"1 Day","status":"Pending","dateFrom":"21-Feb-2017","dateTo":"21-Feb-2017","employeeNumber":"00012879","employeeName":"Nir Dagan","categoryId":"0400","category":"Military Service"},{"number":"36208242001","total":"1 Day","status":"Pending","dateFrom":"19-Feb-2017","dateTo":"19-Feb-2017","employeeNumber":"00001786","employeeName":"Carmit Hershman","categoryId":"0100","category":"Vacation"}];
