# **Financial Assets Analyst.**

Financial Assets Analyst is my University of Piraeus Masters thesis project, A full-stack application giving the ability to perform basic technical analysis on US stock charts, Download datasets and provide insights through a basic trading System, giving the user the abillity to decide wether there's an opportunity to buy-sell financial data.

---

<br>

## **🚀 Tech Stack 🚀**

<br>

The project was created using the below Tech stack:

### **Back end**

* **(Java) Spring Framework REST API** (combined with Hibernate to handle the database in ORM technique).

  <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Spring_Framework_Logo_2018.svg" alt="drawing" style="width:200px;"/>

* **MongoDB:** No-SQL Database which also allows us to scale to the cloud easilly using MongoDB Atlas.

   <img src="https://companieslogo.com/img/orig/MDB_BIG.D-96d632a9.png?t=1648915248" alt="drawing" style="width:200px;"/>

### **FrontEnd**

* **NextJS:** A ReactJS framework coming with handy tools for rapid applications development.

  <img src="https://ui-lib.com/blog/wp-content/uploads/2021/12/nextjs-boilerplate-logo.png" alt="drawing" style="width:200px;"/>

* **Typescript:** A strongly typed Programming Language built on top of Javascript. Its structure helps developing more robust and scalable Projects.

  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="drawing" style="width:200px;"/>

### **Noteable frontend Libraries that i used for this Project:**

* **Redux-Toolkit & RTK Query:** Redux is a great choice for large projects, as it handles global State Management. RTK Query helps with efficient data fetching.

   <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png" alt="drawing" style="width:200px;background:white"/>

* **TailwindCSS:** Tailwind is a utility-first CSS framework giving you the ability to quickly style your components rapidly.

    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Tailwind_CSS_logo.svg/512px-Tailwind_CSS_logo.svg.png?20220224135351" alt="drawing" style="width:200px;background:white"/>

# **Short details about the Backend...**

The No-SQL DB is hosted on MongoDB Atlas. Spring is responsible for CRUD operations on the Database. Taking a look at the Cluster we would notice the following collections of data:

* **AssetsList:** This collection holds all the available data the application can provide for charting-downloading operations. It holds basic data about each Financial Asset. There's A **Scheduled Task** for this AssetsList to be updated on an Interval.

* **DbAssetsTracker:** This Collection contains the Financial Assets ( one entry per financial asset-Timeframe ) that are already stored in the MongoDB database. It also contains a lastUpdated attribute to help decide wether there's available data or not, depending on the last time the dataset was updated. Lastly one more attribute to mention is isCurrentlyUpdating, which serves as a lock variable to ensure that we avoid starvation(concurrent api calls-updates). We solve that problem in the AppController Java file.

* The rest of the financial data are stored in a dynamic way. With Spring we have the ability to create dynamic MongoDB collections. That way we can define Collections for each asset by combining their ticker symbol (it is unique for each asset) and the Timeframe. So for example if we had AAPL stored in the database, its collection would look like : **AAPL_1day**.

A basic Flowchart on how the Spring Application operates would look like this

  <img src="https://lh3.googleusercontent.com/fife/AAbDypBGPvivpC-i80XJirZXJ9xyHM7us92-1hjBUaoF9RqvFfNUbnbrjvqEMt0ioEomAe2o-YFmUkXyByiFiRPkufF5b3fYMzyseOcfrCCFRRxUKO9O3PQVXqkHyoX1BUvDK2gIkqqzn-9PjjF615rLCrKiqliyIcGErgoxjYjDbFssnCXgpQTiJVsrsv8h9VamNoLJtsoLkcuva-kBuDQL4sgGULhLQ0AU_o5ox8lsN3CHQw-ORN-2DLtCfksV-hYu59yE5EwCMMpumPh_oe3WdOMPnZvD2Hlw52M60kdZGsrjRUCN7oO_bV6URu5YEYKMYkwG6z3Kzo5lK47kZ3EZ4qQUfsXP-8X4871vfJdnQ88g1oH1F34MGKV45daLqlC0gNirsDH70D9f4dtrm57pVfZDyT9QTbsn9Uu1V4BNw031Qwi57eYb3bV6n3-B7I3UCGB9yJ1TD10m3iDyzpotbWiSLKfLcWFMQ2aahFUi96nqHV5AJ4UDMOT33s7CJAoGnoqAELjvqkj0XfG7RDycl5MQJOARDP-Uh-_rYWyE6q0X08VoA8KqZHUZzLU_yZ4vM0DuKuminv3Qsmqrx5vZMqQ3s6flYuh1sw57O76u2OjmDoB3JToHe4kYekF-l3-2ckEND_w1LgLxO8FWk93_YnPR9IGkZifC38NPX7klgas0XuT0uIWTohX__3RVw-JlqDiP6Mj2RFvDaZD9MidM0si5CCxWqk98GS91iDgw0gRTuuKfPQnQv5MyRheZcd_1McUVDcSLYuxFpfFT0sGFZI1GSJw2UpAlctgMY5dFt4vax3hAUNYrAtbu2hD6YEg7r00e_03RgR5_8Gg_kQX7MbT2st5oviD7EaJgGChEucf1rO20yQKVJ1bxHu-LBzhkUqxECBX4ivQMbWAMaiZV4ARWKARDGpbSd3wQEp2xuEK4Pejj4JXDWeWMjb0tQ69XQhRsnlBoXGkwpEG2sxnHTwFC8Puj1kiHcRVY0Udwj77zX82b29NMC03gCuIhtL6QUK1HHtt44-QSgub-LsQwqPHoIlQymIOefE0qf326Hnmxulaof_6GLDj2imPp5967V7J6XDxgZWE2HtR9N_r64kD0Xqhji2I2XI02KXPsWwWzQnWB4EAQEOLZGW14nhWOMrLnFU4lfnLgwoWnlCNSd9oX9Rz2n7WiZOKsRw56ldOzszZH2IDBciSQn1naWnxX9Bt0U5y6bX421qzb37faYXWYaeuN7pB5c3s66kKRAb0jcqWKbBArU_nUM5AMLfFaWgVQjbsosn82b_A0cNJ9jyfBawNLujuW8McdQLo5CDjEYVSWci1ZT4i3vbt7gpmU9OS-yA0rpfnRubA-szoQa7EC54-Tc_Jhyww8i9wz5Thv5wg-kI2nPMxPAFXMa14XywLb_EgRL3B0jYOOvGDHqCVA_ZEM04gaCl48XLE7byhHeYo4t3_zHCYSrY_3ef9ZaZSy0WE1LBqa-sV7fNUxmbrpFNFE2fzlm-1ihPuhtkj34ZUVZd2G=w1921-h957" alt="drawing" />

Besides these operations, The App runs 2 scheduled tasks. One for updating the assetsList and one for operating Predictive Analysis (a very basic trading system) on the assets that are available in MongoDB.

<br>

Regarding the Java Application, for each Collection we have a class that represents it and it equivalent repository, in which we create our databasse handling operations through Hibernate.
AppController stores all the API endpoints. Technical Indicators folder contains the available indicators to perform Predictive Analysis. For charting we let React Financial Charts handle these calculations (Like EMA 20 , RSI 12 etc).

<br>

# **Short details about the Frontend...**

In a nutshell the main parts of the project are structured as follows.

```
Project
│   README.md
│     
│
└───src
│   │   file011.txt
│   │   file012.txt
│   │
│   └───components
│       │   file111.txt
│       │   file112.txt
│       │   ...
│   
└───pages
│   
│      
│
└───Layout


```

* **src:** source folder containing React sub-components, the Redux Store, Slices, RTK Query API endpoints etc.
* **pages:** NextJS' prebuilt routing system. All the pages are stored inside this directory.
* **Layout:** Contains the shared components that surround the application on every page. This way we avoid unecessary re-renders of components that are "static", like the footer.

Throughout the application, both useState, FetchAPI and Redux, RTK-Query were used. The reasons of using Redux were the following:

1. Get a hands on experience with Global State Management from Redux and data caching operations.
2. If this project ends up in production, having Redux pre-built would help scaling much faster, since Redux is not necessary for every occassion but suggested if you feel like your project has to grow for big teams of developers to manage.

<br>

# Todos - Tasks List 🔮

### **Frontend** 👨‍💻

* [x] Consider a better - more user Friendly Search Bar.
* [ ] Replace the Modals with more Responsive - Alternative Components.
* [ ] Replace the predictive analysis result text on the Datagrid with a gauge Chart.
* [ ] Tackle Responsiveness issues that have to do with working on massive Amounts of Data.

### **Backend** 👨‍💻

* [ ] Cleanup the API endpoints. Maybe there's more segmentation to be done in terms of code
* [ ] Convert the return values of the API endpoints to ResponseEntities.
