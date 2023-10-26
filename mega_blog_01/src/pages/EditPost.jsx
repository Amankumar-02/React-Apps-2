import React, {useState, useEffect} from "react";
import {Container, PostForm} from '../components/index'
import service from "../appwrite/mainConfig";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost(){
    const [posts, setPosts] = useState([]);
    const {slug} = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            service.getPost(slug)
            .then(postFetch=>{
                if(postFetch){
                    setPosts(postFetch)
                }
            })
        }else{
            navigate('/')
        }
    }, [slug, navigate])

    //posts word changes
    return posts? (
        <div className="py-8">
            <Container>
                <PostForm post={posts}/>
            </Container>
        </div>
    ) : null
}