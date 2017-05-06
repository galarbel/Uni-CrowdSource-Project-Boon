import React, {PropTypes} from "react";
import CatalogItem from './ItemDetails';

const dummyData = [{item:"Reuven Oved",name:"Gal Arbel",area:"Binyamina"},
                    {item:"Cat",name:"Yuval Reches",area:"Hod/Ramat Hasharon"},
                    {item:"Babushka",name:"Ariel Goldberger",area:"Rehovot"},
                    {item:"Smelly cat",name:"Avihai Franco",area:"Yavne"}];

class CatalogPage extends React.Component {

     constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <div>
            {dummyData.map(
                (itemData,index)=> <CatalogItem data={itemData}  key={index}/>
                )}
            </div>
        );
    }
}


CatalogPage.propTypes = {
    actions: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.element
};


export default CatalogPage;