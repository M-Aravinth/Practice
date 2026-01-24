import { LightningElement, wire } from 'lwc';
import fetchMenuItems from '@salesforce/apex/MenuCardController.fetchMenuItems';
import foodImageResource from '@salesforce/resourceUrl/FoodItem';
import Biriyani from '@salesforce/resourceUrl/Biriyani';

export default class MenuCard extends LightningElement {
    menuItems = [];

    @wire(fetchMenuItems)
    menuItemsHandler({ data, error }) {
        if (data) {
            this.menuItems = data.map(item => {
                return {
                    ...item, // clone the reactive proxy object
                    imageUrl: Biriyani//foodImageResource + "/images/Meals.jpeg" //+ item.Image_Resource_Name__c + ".jpeg"
                };
            });
        }
        else if (error) {
            console.error(error);
        }
    }
}