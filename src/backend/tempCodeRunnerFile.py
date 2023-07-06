ame(__file__))
    ip=socket.gethostbyname(socket.gethostname())
    with open("server_url.json", "w") as f:
        f.write(f'{{"url":"{ip}"}}')
    app.run(debug=True, h