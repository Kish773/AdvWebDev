import sqlite3

def view_records():
    conn = sqlite3.connect('./app.db')
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM user")
    records = cursor.fetchall()
    
    for record in records:
        print(record)
    
    conn.close()

if __name__ == "__main__":
    view_records()
