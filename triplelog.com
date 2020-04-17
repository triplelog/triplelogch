
server {
	server_name martianmath.com;
	location ~ /* {
			proxy_pass https://127.0.0.1:12312;
			proxy_http_version 1.1;
			proxy_set_header Upgrade $http_upgrade;
			proxy_set_header Connection "Upgrade";
	}



}

server {
    if ($host = martianmath.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80 default_server;
        listen [::]:80 default_server;
        server_name martianmath.com;
    return 404; # managed by Certbot


}