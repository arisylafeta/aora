import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.jsm.aora",
    projectId: "66cf0917001cb449f219",
    databaseId: "66cf0a5e00093d44c7b2",
    userCollectionId: "66cf0a8a003ada514cf2",
    videoCollectionId: "66cf0aa90015ad1c9ef6",
    storageId: "66cf0c6f0005077982e5"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
            }
        )
    }catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async (email, password) =>{
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session
    }catch (error){
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if(!currentUser) throw Error;
        return currentUser.documents[0]
    }catch(error) {
        
    }
}

export const getAllPosts = async () => {
    try{
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId)

            return posts.documents;
    }catch(error) {
        console.log(error);
    }
}

export const getLatestPosts = async () => {
    try{
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId)

            [Query.orderDesc("$createdAt", Query.limit(7))]
            return posts.documents;
    }catch(error) {
        console.log(error);
    }
}

// Get video posts that matches search query
export async function searchPosts(query) {
    try {
      const posts = await databases.listDocuments(
        config.databaseId,
        config.videoCollectionId,
        [Query.search("title", query)]
      );
  
      if (!posts) throw new Error("Something went wrong");
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Get video posts created by user
export async function getUserPosts(userId) {
    try {
      const posts = await databases.listDocuments(
        config.databaseId,
        config.videoCollectionId,
        [Query.equal("creator", userId)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }