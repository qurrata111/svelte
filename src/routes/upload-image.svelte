<script context="module">

</script>

<script>
    import axios from 'axios';

    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1';
    const CLOUDINARY_CLOUD_NAME = 'qurrata111';
    const CLOUDINARY_UPLOAD_PRESET = 'ee6owq6a';

    let src = '';
    let src_q_best = '';
    let src_q_good = '';
    let src_q_eco = '';
    let src_q_low = '';
    let src_w_q = '';
    
    let src_fl_lossy = '';
    let src_f_auto = '';

    let src_opt_size = '';

    // HANDLE UPLOAD IMAGE
    let avatar, fileinput;
	
	const onFileSelected = async (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.onload = e => {
            avatar = e.target.result;
        };
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        let response = await axios
                    .post(`${CLOUDINARY_URL}/${CLOUDINARY_CLOUD_NAME}/image/upload`, formData)
                    .then((response) => {
                        if (response.status == '200'){
                            console.log(response.data);
                            return {
                                success: 1,
                                file: {
                                    url: response.data.url,
                                    public_id: response.data.public_id,
                                    version: response.data.version,
                                }
                            }
                        }
                    });
                    // .post(`http://localhost:8000/upload`, image)
                    // .then((response) => {
                    //     if (response.status == '200'){
                    //         console.log(response.data);
                    //         return {
                    //             success: 1,
                    //             file: {
                    //                 url: response.data.url,
                    //                 public_id: response.data.public_id,
                    //                 version: response.data.version,
                    //             }
                    //         }
                    //     }
                    // });

        src = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v${response.file.version}/${response.file.public_id}`;

        src_q_best = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/q_auto:best/v${response.file.version}/${response.file.public_id}`;
        src_q_good = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/q_auto:good/v${response.file.version}/${response.file.public_id}`;
        src_q_eco = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/q_auto:eco/v${response.file.version}/${response.file.public_id}`;
        src_q_low = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/q_auto:low/v${response.file.version}/${response.file.public_id}`;
        src_w_q = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_600/q_100/v${response.file.version}/${response.file.public_id}`;

        src_fl_lossy = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/fl_lossy/v${response.file.version}/${response.file.public_id}.jpg`;
        src_f_auto = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto/v${response.file.version}/${response.file.public_id}.jpg`;

        src_opt_size = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_auto/dpr_auto/v${response.file.version}/${response.file.public_id}.jpg`;
        
    }
</script>

<svelte:head>
    <title>Upload Image</title>
</svelte:head>

<div class="flex flex-col">
    <div class="p-4">
        <div class="flex justify-center">
            <img
                class="h-20 w-20"
                src="https://static.thenounproject.com/png/625182-200.png"
                alt=""
                on:click={()=>{fileinput.click();}}
            />
        </div>
        <div
            class="text-center text-lg hover:font-bold"
            on:click={()=>{fileinput.click();}}
        >
            Choose Image
        </div>
        <input 
            style="display:none"
            type="file"
            accept=".jpg, .jpeg, .png, .gif"
            on:change={(e)=>onFileSelected(e)}
            bind:this={fileinput} 
        >
    </div>
    {#if src && src !== ''}
    <div class="flex justify-center text-lg font-bold">Image Format</div>
    <div class="grid grid-cols-3 gap-4 px-4">
        <div>
            jpg
            <img src={`${src}.jpg`} alt=""/>
        </div>
        <div>
            png
            <img src={`${src}.png`} alt=""/>
        </div>
        <div>
            gif
            <img src={`${src}.gif`} alt=""/>
        </div>
        <div>
            bmp
            <img src={`${src}.bmp`} alt=""/>
        </div>
        <div>
            webp
            <img src={`${src}.webp`} alt=""/>
        </div>
    </div>
    <div class="flex justify-center text-lg font-bold">Automatic quality selection</div>
    <div class="grid grid-cols-2 gap-4 px-4">
        <div>
            q_auto:best
            <img src={src_q_best} alt=""/>
        </div>
        <div>
            q_auto:good
            <img src={src_q_good} alt=""/>
        </div>
        <div>
            q_auto:eco
            <img src={src_q_eco} alt=""/>
        </div>
        <div>
            q_auto:low
            <img src={src_q_low} alt=""/>
        </div>
        <div>
            w:600, q_auto:100
            <img src={src_w_q} alt=""/>
        </div>
    </div>
    <div class="flex justify-center text-lg font-bold">Optimum Image Format</div>
    <div class="grid grid-cols-2 gap-4 px-4">
        <div>
            fl_lossy
            <img src={src_fl_lossy} alt=""/>
        </div>
        <div>
            f_auto
            <img src={src_f_auto} alt=""/>
        </div>
    </div>
    <div class="flex justify-center text-lg font-bold">Optimum Image Sizing</div>
    <div class="grid grid-cols-2 gap-4 px-4">
        <div>
            c_scale,w_auto ; dpr_auto
            <img src={src_opt_size} alt=""/>
        </div>
    </div>
    {/if}
</div>