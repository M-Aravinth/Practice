import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    inputValue;
    messageToChild;
    messageFromChild;

    handleChange(event){
        this.inputValue = event.target.value;
    }

    handleSendData(event){
        this.messageToChild = this.inputValue;
    }

    handleResetMessage(){
        this.template.querySelector('c-child-component').resetMessage();
    }

    onSendMessageToParent(event){
        this.messageFromChild = event.detail;
    }
}