function ContactUs() {
    return (
        <div className="contactSection">
            <h1>Contact Us</h1>
            <div>
                <div className="mailLogo">Logo</div>
                <form className="contactForm">
                    <label for="name"> Name: </label>
                    <input type="text" placeholder="Name" id="name" name="name"/>
                    <label for="email"> Email: </label>
                    <input type="text" placeholder="Email" id="email" name="email"/>
                    <label for="message"> Message: </label>
                    <input type="text" placeholder="Message" id="message" name="message"/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    )
}
export default ContactUs