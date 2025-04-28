Errors i face during this project
1. getting a error on index.css file at
@tailwind base;
@tailwind components;
@tailwind utilities;
solved by -> installing tailwind intellisense extension

2. <Link to="/login"><Button>Login<Button/><Link/>
this is not working because we did not cretae browerRouter Routes, and route of that path

3. learn about how to use radio button as an input field.
4. how to upload file in form and how to send files using formData and learn about formData
5. Use multer to handle the file in node.js without multer we are not able to handle any file.
 i. multer provide storage to store the file 
 learn more about multer on youtube

6. user!.id  exclamation is used to tell the compiler that the user value is not null and undefined 

7. we learn about Redux/Redux-toolkit here Redux is a state management library that helps you manage data in large applications. It acts like a central storage for your app’s state, making it easier to share data between components.

8. When an arrow function uses parentheses () instead of curly braces {}, JavaScript automatically returns the expression inside. like these array.map(()=>()) and at the time of using curly braces like data.map(()=>{return
<div>value<div>}) No, curly braces {} require an explicit return statement in an arrow function. If you use {} without return, the function will return undefined.

Key Takeaways
1. The issue is that the user prop is not persisting across different components. When you set setUser(true) in Login.jsx, it only updates the user state within that component. However, when you navigate to another page (navigate("/")), the user state resets because Login.jsx is unmounted and re-rendered.

2 . htmlfor is used to focus on the input when someone type on particular thing like 


9. takes to much time in updating a profile finally solved
i. always look in the return of the backends carefully

10. what is cloudinary?
Cloudinary is like a smart online helper that stores your photos and videos and can:

📤 Take them from you (uploads)

🖼️ Edit them (resize, crop, add filters, text)

🚀 Send them wherever they're needed (like to your website or app)

11. Tool	Role in the Team
DataURIParser	📖 The decoder: Turns weird text back into a photo
Cloudinary	☁️ The uploader: Stores & serves that photo to the world

12. path.extname(file_name) will return the extension of the file like after the dot in the file
