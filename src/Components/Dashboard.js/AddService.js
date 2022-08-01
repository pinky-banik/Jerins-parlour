import React from 'react';
import {AiOutlineCloudUpload} from 'react-icons/ai';

const AddService = () => {
    return (
        <div>

            {/* <div class="flex justify-center items-center w-full">
                <label for="upload" class="flex flex-col justify-center items-center w-full bg-neutral border-2 border-primary outline-primary rounded">
                    <div class="flex justify-center items-center py-2 px-4 text-primary font-">
                        <AiOutlineCloudUpload className='text-2xl mr-1'/>
                        <p className='font-sans'>Upload image</p>
                    </div>
                    <input id="upload" type="file" class="hidden" multiple/>
                </label>
            </div> */}
            
    <input type="button"/><br />
    <input type="checkbox"/><br />
    <input type="color"/><br />
    <input type="date"/><br />
    <input type="datetime-local"/><br />
    <input type="email"/><br />
    <input type="file"/><br />
    <input type="hidden"/><br />
    <input type="image"/><br />
    <input type="month"/><br />
    <input type="number"/><br />
    <input type="password"/><br />
    <input type="radio"/><br />
    <input type="range"/><br />
    <input type="reset"/><br />
    <input type="search"/><br />
    <input type="submit"/><br />
    <input type="tel"/><br />
    <input type="text"/><br />
    <input type="time"/><br />
    <input type="url"/><br />
    <input type="week"/><br />

            </div>
    );
};

export default AddService;