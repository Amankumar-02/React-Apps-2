import React, {useCallback, useEffect} from "react";
import {useForm} from 'react-hook-form'
import {CommonBtn, InputData, Select, RTE} from '../index'
import service from '../../appwrite/mainConfig'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({post}){
    //set the useForm
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        // default values of appwrite attributes
        defaultValues:{
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    //set the extra variables
    const navigate = useNavigate();
    const userData = useSelector(state=>state.userData)

    // form onSubmit Handler
    const submit = async(data)=>{
        // if to update post
        if(post){
            //set bucket
            const file = data.image[0]? await service.uploadFile(data.image[0]) : null;
            if(file){
                service.deleteFile(post.featuredImage)
            }
            //set database
            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file? file.$id : undefined,
            });
            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
            }
        }
        // else to create post
        else{
            //set bucket
            const file = await service.uploadFile(data.image[0]);
            if(file){
                const fileId = file.$id;
                data.featuredImage = fileId;
                //set database
                const dbPost = await service.createPost({
                    ...data,
                    userID: userData.$id,
                });
                if(dbPost){
                    navigate(`post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
      if (value && typeof value === "string")
        // const slug = value.toLocaleLowerCase().replace(/ /g, '_')
        // setValue('slug', slug)
        // return slug
        return value
          .trim()
          .toLocaleLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-");

      return "";
    }, []);

    useEffect(()=>{
        const subscription = watch((value, {name})=>{
            if(name === 'title'){
                setValue('slug', slugTransform(value.title),
                    {shouldValidate: true});
            }
        });
        // below return will optimise the code 
        return ()=>
            subscription.unsubscribe();
    }, [watch, slugTransform, setValue])

    return(
        <>
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <InputData
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <InputData
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <InputData
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <CommonBtn type="submit" bgColor={post ? "bg-green-500" : "bg-blue-500"} className="w-full">
                    {post ? "Update" : "Submit"}
                </CommonBtn>
            </div>
        </form>
        </>
    )
}