n_cases = int(input())

def find_max(array):
  max = 0
  for el in array:
    if int(el) > max:
      max = int(el)

  return max

for n in range(0, n_cases):
  array = input().split(",")

  print(find_max(array))
