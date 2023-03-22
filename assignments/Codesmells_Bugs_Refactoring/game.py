#from troops import Troop
from src.hut import Can
from src.hut import Hut
import time
from src.hut import Th
from src.input import input_to
from src.King import King
from colorama import Fore, Back, Style
from operator import imod
import os
import imp
m = 41
n = 82

#from turtle import distance
#from pyrsistent import b

Barb1 = 0
Barb2 = 0
Barb3 = 0

k = King(3, 1, 400, 30, 2)

rows, cols = (41, 82)
arr = [[0 for i in range(cols)] for j in range(rows)]
# print(arr)

fp = open('replay.txt', 'wt')
fp.write('')
fp.close()

fp = open('replay.txt', 'at')

t0 = time.time()

def change_array(prevx, prevy, x, y):
    arr[prevx][prevy] = 0
    arr[x][y] = 1

class Troop:
    def __init__(self, x, y, health, damage, speed):
        self.x = x
        self.y = y
        self.health = health
        self.damage = damage
        self.speed = speed

    def barbdistance1(self):
        # print("barb1: ",self.x,self.y)
        min1 = distance(self.x, self.y, h1.x, h1.y)
        c = [h1.x, h1.y]
        a = h1
        if(distance(self.x, self.y, h2.x, h2.y) < min1):
            min1 = distance(self.x, self.y, h2.x, h2.y)
            c = [h2.x, h2.y]
            a = h2
        if(distance(self.x, self.y, h3.x, h3.y) < min1):
            min1 = distance(self.x, self.y, h3.x, h3.y)
            c = [h3.x, h3.y]
            a = h3
        if(distance(self.x, self.y, h4.x, h4.y) < min1):
            min1 = distance(self.x, self.y, h4.x, h4.y)
            c = [h4.x, h4.y]
            a = h4
        if(distance(self.x, self.y, h5.x, h5.y) < min1):
            min1 = distance(self.x, self.y, h5.x, h5.y)
            c = [h5.x, h5.y]
            a = h5
        if(distance(self.x, self.y, c1.x, c1.y) < min1):
            min1 = distance(self.x, self.y, c1.x, c1.y)
            c = [c1.x, c1.y]
            a = c1
        if(distance(self.x, self.y, c2.x, c2.y) < min1):
            min1 = distance(self.x, self.y, c2.x, c2.y)
            c = [c2.x, c2.y]
            a = c2
        if(distance(self.x, self.y, th1.x, th1.y) < min1):
            min1 = distance(self.x, self.y, th1.x, th1.y)
            c = [th1.x, th1.y]
            a = th1
        # print(c)
        if(c[0] < self.x and c[1] < self.y):
            if(c[0]-self.x > 2 and c[1]-self.y > 1):
                if(arr[self.y - self.speed][self.x - 2*self.speed] == 0):
                    prevx = self.x
                    prevy = self.y
                    self.x -= 2*self.speed
                    self.y -= self.speed
                    change_array(prevx, prevy, self.x, self.y)
            elif(self.x-c[0] > 2):
                if(arr[self.y][self.x - 2*self.speed] == 0):
                    prevx = self.x
                    prevy = self.y
                    self.x -= 2*self.speed
                    change_array(prevx, prevy, self.x, self.y)
                    
            elif(self.y-c[1] > 1):
                if(arr[self.y - self.speed][self.x] == 0):
                    prevx = self.x
                    prevy = self.y
                    self.y -= self.speed
                    change_array(prevx, prevy, self.x, self.y)

        elif(c[0] > self.x and c[1] < self.y):
            if(c[0]-self.x > 2 and c[1]-self.y > 1):
                if(arr[self.y - self.speed][self.x + 2*self.speed] == 0):
                    prevx = self.x
                    prevy = self.y
                    self.x += 2*self.speed
                    self.y -= self.speed
                    change_array(prevx, prevy, self.x, self.y)
            elif(c[0]-self.x > 2):
                if(arr[self.y][self.x + 2*self.speed] == 0):
                    prevx = self.x
                    prevy = self.y
                    self.x += 2*self.speed
                    change_array(prevx, prevy, self.x, self.y)
            elif(self.y-c[1] > 1):
                if(arr[self.y - self.speed][self.x] == 0):
                    prevx = self.x
                    prevy = self.y
                    self.y -= self.speed
                    change_array(prevx, prevy, self.x, self.y)
        elif(c[0] < self.x and c[1] > self.y):
            if(self.x-c[0] > 2 and c[1]-self.y > 1):
                if(arr[self.y + self.speed][self.x - 2*self.speed] == 0):
                    prevx = self.x
                    prevy = self.y
                    self.x -= 2*self.speed
                    self.y += self.speed
                    change_array(prevx, prevy, self.x, self.y)
            elif(self.x-c[0] > 2):
                if(arr[self.y][self.x - 2*self.speed] == 0):
                    prevx = self.x
                    prevy = self.y
                    self.x -= 2*self.speed
                    change_array(prevx, prevy, self.x, self.y)
            elif(c[1]-self.y > 1):
                if(arr[self.y + self.speed][self.x] == 0):
                    prevx = self.x
                    prevy = self.y
                    self.y += self.speed
                    change_array(prevx, prevy, self.x, self.y)
        elif(c[0] > self.x and c[1] > self.y):
            if(c[0]-self.x > 2 and c[1]-self.y > 1):
                if(arr[self.y + self.speed][self.x + 2*self.speed] == 0):
                    prevx = self.x
                    prevy = self.y
                    self.x += 2*self.speed
                    self.y += self.speed
                    change_array(prevx, prevy, self.x, self.y)
            elif(c[0]-self.x > 2):
                if(arr[self.y][self.x + 2*self.speed] == 0):
                    prevx = self.x
                    prevy = self.y
                    self.x += 2*self.speed
                    change_array(prevx, prevy, self.x, self.y)
            elif(c[1]-self.y > 2):
                if(arr[self.y + self.speed][self.x] == 0):
                    prevx = self.x
                    prevy = self.y
                    self.y += self.speed
                    change_array(prevx, prevy, self.x, self.y)
        if(abs(c[0]-self.x) <= 2 and abs(c[1]-self.y) <= 1):
            a.health = a.health - self.damage
        return


hut1 = [7, 3]
hut2 = [9, 3]
hut3 = [73, 3]
hut4 = [7, 37]
hut5 = [73, 37]
h1 = Hut(7, 3, 100)
h2 = Hut(9, 3, 100)
h3 = Hut(73, 3, 100)
h4 = Hut(7, 37, 100)
h5 = Hut(73, 37, 100)
c1 = Can(13, 7, 400, 25)
c2 = Can(67, 7, 400, 25)
th1 = Th(40, 20, 500)
b1 = Troop(3, 39, 200, 20, 1)
b2 = Troop(65, 33, 200, 20, 1)
b3 = Troop(39, 3, 200, 20, 1)


def attack_1():
    k.attack(th1)
    k.attack(c1)
    k.attack(c2)
    k.attack(h1)
    k.attack(h2)
    k.attack(h3)
    k.attack(h4)
    k.attack(h5)


def defense():
    c1.defense(k)
    if(c2.defense(k)):
        pass
    elif(c1.defense(b1)):
        pass
    elif(c1.defense(b3)):
        pass
    elif(c1.defense(b2)):
        pass
    elif(c2.defense(b1)):
        pass
    elif(c2.defense(b3)):
        pass
    elif(c2.defense(b2)):
        pass

def distance(x1, y1, x2, y2):
    return ((((x2 - x1)**2) + ((y2-y1)**2))**0.5)


while(True):
    # os.system("clear")
    p = input_to()
   # time.sleep(0.1)
   # print("King Health: ",end="")
    # for i in range(k.health):
    #   print(Back.GREEN,end="")
    # print(Style.RESET_ALL)
    if(h1.health <= 0 and h2.health <= 0 and h3.health <= 0 and h4.health <= 0 and h5.health <= 0 and c1.health <= 0 and c2.health <= 0 and th1.health <= 0):
        print("You have won the game")
        break
    elif(k.health <= 0 and b1.health <= 0 and b2.health <= 0 and b3.health <= 0):
        print("You have lost the game")
        break
    if(p == "w" and k.y - 1 >= 0 and arr[k.y - 1][k.x] == 0):
        fp.write("w %s\n" % (time.time() - t0))
        for i in range(k.speed):
            if(k.y - 1 >= 0 and arr[k.y - 1][k.x] == 0):
                k.y = k.y - 1
                arr[k.y][k.x] = 1
                arr[k.y + 1][k.x] = 0
    elif(p == "s" and k.y + 1 >= 0 and arr[k.y + 1][k.x] == 0):
        fp.write("s %s\n" % (time.time() - t0))
        for i in range(k.speed):
            if(k.y + 1 <= m-1 and arr[k.y + 1][k.x] == 0):
                k.y = k.y + 1
                arr[k.y][k.x] = 1
                arr[k.y - 1][k.x] = 0
    elif(p == "a" and k.x - 2 >= 0 and arr[k.y][k.x - 2] == 0):
        fp.write("a %s\n" % (time.time() - t0))
        for i in range(k.speed):
            if(k.x - 2 >= 0 and arr[k.y][k.x - 2] == 0):
                k.x = k.x - 2
                arr[k.y][k.x] = 1
                arr[k.y][k.x + 2] = 0
    elif(p == "d" and k.x + 2 >= 0 and arr[k.y][k.x + 2] == 0):
        fp.write("d %s\n" % (time.time() - t0))
        for i in range(k.speed):
            if(k.x + 2 <= n-1 and arr[k.y][k.x + 2] == 0):
                k.x = k.x + 2
                arr[k.y][k.x] = 1
                arr[k.y][k.x - 2] = 0
    elif(p == "h"):  # heal spell
        fp.write("h %s\n" % (time.time() - t0))
        if(1.5*(k.health) < 400):
            k.health = 1.5*k.health
        else:
            k.health = 400
        if(1.5*(b1.health) < 200):
            b1.health = 1.5*b1.health
        else:
            b1.health = 200
        if(1.5*(b2.health) < 200):
            b2.health = 1.5*b2.health
        else:
            b2.health = 200
        if(1.5*(b3.health) < 200):
            b3.health = 1.5*b3.health
        else:
            b3.health = 200
    elif(p == "r"):  # rage spell
        fp.write("r %s\n" % (time.time() - t0))
        if(k.health > 0):
            k.speed = 2*k.speed
            k.damage = 2*k.damage
        if(b1.health > 0):
            b1.speed = 2*b1.speed
            b1.damage = 2*b1.damage
        if(b2.health > 0):
            b2.speed = 2*b2.speed
            b2.damage = 2*b2.damage
        if(b3.health > 0):
            b3.speed = 2*b3.speed
            b3.damage = 2*b3.damage
    elif(p == "b"):
        fp.write("b %s\n" % (time.time() - t0))
       # b1 = Troop(3,39,200,20,1)
        Barb1 = 1
    elif(p == "2"):
        fp.write("2 %s\n" % (time.time() - t0))
       # b2 = Troop(65,33,200,20,1)
        Barb2 = 1
    elif(p == "3"):
        fp.write("3 %s\n" % (time.time() - t0))
       # b3 = Troop(39,3,200,20,1)
        Barb3 = 1
    elif(p == " "):
        fp.write("  %s\n" % (time.time() - t0))
        attack_1()
    elif(p == "q"):
        fp.write("q %s\n" % (time.time() - t0))
        break
    print(chr(27) + "[2J")
    for i in range(m-1):
        print(" ___", end="")
    print("")
    defense()
    if(Barb1):
        b1.barbdistance1()
    if(Barb2):
        b2.barbdistance1()
    if(Barb3):
        b3.barbdistance1()
    for i in range(m):
        for j in range(n):
            l = int((j-1)/2)
            if(i == k.y and j == k.x):  # king spawn
                if(k.health > 0):
                    print(Fore.RED + "_K_", end="")
                    print(Style.RESET_ALL, end="")
                    arr[i][j] = 1
                else:
                    if(j % 2 == 0):
                        print("|", end="")
                        arr[i][j] = 0
                    else:
                        print("___", end="")
                        arr[i][j] = 0
            #    strings[(i+1)*(l)] = "_K_"
            # elif(Barb1==1):
            elif(i == b1.y and j == b1.x):  # barb1 spawn
                if(b1.health > 125):
                    print(Fore.GREEN + "_B1", end="")
                    print(Style.RESET_ALL, end="")
                    arr[i][j] = 1
                elif(b1.health > 50):
                    print(Fore.YELLOW + "_B1", end="")
                    print(Style.RESET_ALL, end="")
                    arr[i][j] = 1
                elif(b1.health > 0 and b1.health <= 50):
                    print(Fore.RED + "_B1", end="")
                    print(Style.RESET_ALL, end="")
                    arr[i][j] = 1
                else:
                    print("___", end="")
                    arr[i][j] = 0
                    b1.x = -100
                    b1.y = -100
            # elif(Barb2):
            elif(i == b2.y and j == b2.x):  # barb2 spawn
                if(b2.health > 125):
                    print(Fore.GREEN + "_B2", end="")
                    print(Style.RESET_ALL, end="")
                    arr[i][j] = 1
                elif(b2.health > 50):
                    print(Fore.YELLOW + "_B2", end="")
                    print(Style.RESET_ALL, end="")
                    arr[i][j] = 1
                elif(b2.health > 0 and b2.health <= 50):
                    print(Fore.RED + "_B2", end="")
                    print(Style.RESET_ALL, end="")
                    arr[i][j] = 1
                else:
                    print("___", end="")
                    arr[i][j] = 0
                    b2.x = -100
                    b2.y = -100
            # elif(Barb3):
            elif(i == b3.y and j == b3.x):  # barb3 spawn
                if(b3.health > 125):
                    print(Fore.GREEN + "_B3", end="")
                    print(Style.RESET_ALL, end="")
                    arr[i][j] = 1
                elif(b3.health > 50):
                    print(Fore.YELLOW + "_B3", end="")
                    print(Style.RESET_ALL, end="")
                    arr[i][j] = 1
                elif(b3.health > 0 and b3.health <= 50):
                    print(Fore.RED + "_B3", end="")
                    print(Style.RESET_ALL, end="")
                    arr[i][j] = 1
                else:
                    print("___", end="")
                    arr[i][j] = 0
                    b3.x = -100
                    b3.y = -100
            elif(i < 21 and i > 17):
                if(j > 36 and j < 44):
                    if(th1.health > 400):
                        if(j % 2 == 0):
                            print("|", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 0
                        else:
                            print(Back.BLUE + "___", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                        #   strings[(i+1)*(l)] = "___"
                    elif(th1.health > 250):
                        if(j % 2 == 0):
                            print("|", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 0
                        else:
                            print(Back.GREEN + "___", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                    elif(th1.health > 100):
                        if(j % 2 == 0):
                            print("|", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 0
                        else:
                            print(Back.YELLOW + "___", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                    elif(th1.health > 0):
                        if(j % 2 == 0):
                            print("|", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 0
                        else:
                            print(Back.RED + "___", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                    else:
                        if(j % 2 == 0):
                            print("|", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 0
                        else:
                            print("___", end="")
                            arr[i][j] = 0
                            th1.x = -100
                            th1.y = -100
                        #   strings[(i+1)*(l)] = "___"
                elif(j == 34 or j == 44):
                    print("|", end="")
                    print(Style.RESET_ALL, end="")
                elif(j == 35 or j == 45):
                    print("Wal", end="")
                    print(Style.RESET_ALL, end="")
                    arr[i][j] = 1
                  #  strings[(i+1)*(l)] = "Wal"
                elif(j != 81):
                    if (j % 2 == 0):
                        print("|", end="")
                    else:
                        print("___", end="")
                    arr[i][j] = 0
                    #  strings[(i+1)*(l)] = "___"
                else:
                    print("")
            elif(i == 21 or i == 17):
                if(j > 34 and j < 46):
                    if(j % 2 == 0):
                        print("|", end="")
                        print(Style.RESET_ALL, end="")
                    else:
                        print("Wal", end="")
                        print(Style.RESET_ALL, end="")
                        arr[i][j] = 1
                   #     strings[(i+1)*(l)] = "Wal"
                elif(j != 81):
                    if (j % 2 == 0):
                        print("|", end="")
                    else:
                        print("___", end="")
                    arr[i][j] = 0
                   #     strings[(i+1)*(l)] = "___"
                else:
                    print("")
        # elif((j==34 or j==44) and (i>16 and i<22)):
            #    print("|",end="")
            #   print(Style.RESET_ALL,end="")
            # elif((j==35 or j==45) and (i>16 and i<22)):
            #       print("Wal",end="")
            #      print(Style.RESET_ALL,end="")
            elif((j == 7 or j == 8 or j == 9 or j == 10 or j == 73 or j == 74) and i == 3):  # upper huts
                if(j % 2 == 0):
                    print("|", end="")
                    print(Style.RESET_ALL, end="")
                else:
                    if(j == 7 and i == 3):
                        if(h1.health > 50):
                            print(Fore.GREEN + "Hut", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                        elif(h1.health > 20):
                            print(Fore.YELLOW + "Hut", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                        elif(h1.health > 0 and h1.health <= 20):
                            print(Fore.RED + "Hut", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                        else:
                            print("___", end="")
                            arr[i][j] = 0
                            h1.x = -100
                            h1.y = -100
                    if(j == 9 and i == 3):
                        if(h2.health > 50):
                            print(Fore.GREEN + "Hut", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                        elif(h2.health > 20):
                            print(Fore.YELLOW + "Hut", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                        elif(h2.health > 0 and h2.health <= 20):
                            print(Fore.RED + "Hut", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                        else:
                            print("___", end="")
                            arr[i][j] = 0
                            h2.x = -100
                            h2.y = -100
                    if(j == 73 and i == 3):
                        if(h3.health > 50):
                            print(Fore.GREEN + "Hut", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                        elif(h3.health > 20):
                            print(Fore.YELLOW + "Hut", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                        elif(h3.health > 0 and h3.health <= 20):
                            print(Fore.RED + "Hut", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                        else:
                            print("___", end="")
                            arr[i][j] = 0
                            h3.x = -100
                            h3.y = -100
                   # strings[(i+1)*(l)] = "Hut"
            elif((j == 7 or j == 8 or j == 73 or j == 74) and i == 37):  # lower huts
                if(j % 2 == 0):
                    print("|", end="")
                    print(Style.RESET_ALL, end="")
                else:
                    if(j == 7 and i == 37):
                        if(h4.health > 50):
                            print(Fore.GREEN + "Hut", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                        elif(h4.health > 20):
                            print(Fore.YELLOW + "Hut", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                        elif(h4.health > 0 and h4.health <= 20):
                            print(Fore.RED + "Hut", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                        else:
                            print("___", end="")
                            arr[i][j] = 0
                            h4.x = -100
                            h4.y = -100

                    if(j == 73 and i == 37):
                        if(h5.health > 50):
                            print(Fore.GREEN + "Hut", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                        elif(h5.health > 20):
                            print(Fore.YELLOW + "Hut", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                        elif(h5.health > 0 and h5.health <= 20):
                            print(Fore.RED + "Hut", end="")
                            print(Style.RESET_ALL, end="")
                            arr[i][j] = 1
                        else:
                            print("___", end="")
                            arr[i][j] = 0
                            h5.x = -100
                            h5.y = -100
                   # strings[(i+1)*(l)] = "Hut"
            elif((j == 13 or j == 14 or j == 66 or j == 67) and i == 7):  # canons
                if(j == 13 and i == 7):
                    if(c1.health > 200):
                        print(Fore.GREEN + "Can", end="")
                        print(Style.RESET_ALL, end="")
                        arr[i][j] = 1
                    elif(c1.health > 50):
                        print(Fore.YELLOW + "Can", end="")
                        print(Style.RESET_ALL, end="")
                        arr[i][j] = 1
                    elif(c1.health > 0 and c1.health <= 50):
                        print(Fore.RED + "Can", end="")
                        print(Style.RESET_ALL, end="")
                        arr[i][j] = 1
                    else:
                        print("___", end="")
                        arr[i][j] = 0
                        c1.x = -100
                        c1.y = -100
                elif(j == 67 and i == 7):
                    if(c2.health > 200):
                        print(Fore.GREEN + "Can", end="")
                        print(Style.RESET_ALL, end="")
                        arr[i][j] = 1
                    elif(c2.health > 50):
                        print(Fore.YELLOW + "Can", end="")
                        print(Style.RESET_ALL, end="")
                        arr[i][j] = 1
                    elif(c2.health > 0 and c2.health <= 50):
                        print(Fore.RED + "Can", end="")
                        print(Style.RESET_ALL, end="")
                        arr[i][j] = 1
                    else:
                        print("___", end="")
                        arr[i][j] = 0
                        c2.x = -100
                        c2.y = -100
                else:
                    print("|", end="")
            elif(j != 81):
                if (j % 2 == 0):
                    print("|", end="")
                else:
                    print("___", end="")
                arr[i][j] = 0
                # strings[(i+1)*(l-1)] = "___"
            else:
                print("")
    print("King's Health: ")
    for i in range(100):
        if(i <= (k.health/400)*100):
            print(Back.GREEN + " ", end='')
            print(Style.RESET_ALL, end="")
        else:
            print(" ", end="")
    print('', end="")
    print("|")
    # for i in range(m-1):
    #    print(strings[i])


# print(k.x,k.y,k.health,k.damage,k.speed)
