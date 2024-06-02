import React from 'react'
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
const LiveChatcomponent = () => {
    return <>
        <Card
            variant="outlined"
            sx={{
                maxHeight: '90vh',
                width: '20vw',
                // to make the card resizable
                overflow: 'hidden',
                resize: 'both',
            }}
        >
            <CardContent>


            </CardContent>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    event.currentTarget = ""
                }}
                style={{ "display": "flex" }}
            >

                <Input placeholder="Try to submit with no text!" required />
                <Button type="submit">Submit</Button>

            </form>

        </Card>
    </>
}
export default LiveChatcomponent