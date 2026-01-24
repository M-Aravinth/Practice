import { LightningElement } from 'lwc';

export default class GreetingComponent extends LightningElement {
    // Current local time string (optional usage in template)
    time = new Date().toLocaleTimeString();

    // Compute greeting based on current hour
    get message() {
        
        const hour = new Date().getHours();
        console.log('hour', hour);
        console.log('time', this.time);
        if (hour < 12) {            
            return 'Good Morning';
        } else if (hour < 18) {
            return 'Good Afternoon';
        }
        return 'Good Evening';
    }
}