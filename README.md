how to get the google places api key
just get a gmail account
type "google developer console" in google and search for it
if you have existing apps they will be in the dropdown
create a new project (from the dropdown in the main navbar)
give a project name and hit create (he didn't give the location but you may give the location)
search for "places"
click on "Places Api"
make sure "Api Enabled" , you will have to enter your credit card information
copy your api key
when you are deploying it, try and do the "protect your api key section"
go to "Api & services"
pick the project that you are currently working on , click on credentials in the sidebar , click on "show key" in the far right
so all this that we have done is for the maps api key

now we will do for the "places key"

uploading images
we do not want to resize at the backend
we will resize at the frontend and give it to our server that will give to aws to store
when the backend is done storing those images (s3 bucket, we can also use cloudinary or firebstore storage) it will give us the go ahead and also the url of those images back to our server and to our frontend and we will put those urls in state and send it to our server for an ad to be create

how to create an s3 bucket
aws.amazon.com/console
services , search for s3 , create a bucket (so it means that you can create buckets for every project)
give your bucket a name and click create bucket
leave everything as default and create bucket
click on the bucket name from the list
click on the permissions tab , edit bucket policy
click on the policy generator button (he did right click and opened in a new tab)
select the type of policy and click s3 bucket
type the user arn in principal field
go to IAM or go to services tab and look for IAM there
on the sidebar click on users and select your user that you created
then you can copy the user's arn
paste it in the policy general principal field
in actions, select GetObject and GetObjectVersion
copy the bucket arn and paste it into the arn field
go to the services tab again, this time around you are looking for IAM but s3 and click on it
click on the bucket in that list
copy the amazon resource name arn
add forward slash asterix to the end of the arn
click on add statement , and click on generate policy too as well
copy the policy json document
make sure that your images can be accessed publicly enable ACL (access control list)
from where we found the bucket, click on the permissions tab,
click on edit bucket policy
paste the json document you copied there and click on save changes on the right below
scroll down to find object ownership , click on edit in the far right corner
click on ACLs enabled
click on the "i acknowledge that ACLs will be restored"
click on bucket owner prefered
click on save changes
edit block public access (bucket settings), click on the edit button
uncheck "Block all public access"
