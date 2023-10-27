import config from '../config/config'

// here import appwrite account handlers
import { Client, Account, ID } from "appwrite";

// here start the quality code high level
export class AuthService{
    // now, here set the properties
    client = new Client();
    account;

    constructor(){
        // set the client
        this.client
            .setEndpoint(config.appwriteUrl)             // Your API Endpoint
            .setProject(config.appwriteProjectId);       // Your project ID
        this.account  = new Account(this.client)
    }

    // the below is helpfull when the backend is change, no need to change the complete code
    // just change the client id's 
    // create account method
    async createAccount ({email, password, name}){
        try {
            // at the creation first three parameters order is important
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                // call another method
                return this.createLogin({email, password});
            }else{
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    async createLogin ({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log(`Appwrite service :: getCurrentUser :: error`, error);
        }
        return null;
    }

    async createLogout(){
        try {
            // deleteSessions ==> delete all login sessions
            // 2nd deleteSession('current') ==> delete only the current session
            await this.account.deleteSessions();
        } catch (error) {
            console.log(`Appwrite service :: logout :: error`, error);
        }
    }

}

// calling the class and wrap the class into object
const authService = new AuthService();

export default authService

// now we have access of authService.createLogin/ createAccount/ createLogout/ etc.