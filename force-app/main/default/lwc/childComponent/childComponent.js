import { LightningElement,api } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api message;
    inputValue;

    @api resetMessage(){
        this.message = '';
    }

    handleChange(event){
        this.inputValue = event.target.value;
    }

    handleSendMessageToParent(event){
        const customEvent = new CustomEvent('send', {
            detail : this.inputValue
        });
        this.dispatchEvent(customEvent);
    }
}