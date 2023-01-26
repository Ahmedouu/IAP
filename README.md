using a topic exchange would mean we have to add something else to the stack im not that good a javascript per say and 

set up an exchange on top of this channel and create different queues for different locations that way we can leverage the roouting key feature to direct traffic to each queue, and by adding a queue to each venue we can assure that each request is sent properly


set up a queue for each level maybe 




                
//////\\\\\
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management
//////\\\\\\
