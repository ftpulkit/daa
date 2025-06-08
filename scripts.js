const programs = {
  findMax: `#include <stdio.h>

int main() {
    int n, num, max;

    printf("Enter how many numbers: ");
    scanf("%d", &n);

    if (n <= 0) return 0;

    printf("Enter number 1: ");

    scanf("%d", &max);

    for (int i = 2; i <= n; i++) {
        printf("Enter number %d: ", i);
        scanf("%d", &num);
        if (num > max)
            max = num;
    }

    printf("Maximum = %d\n", max);
    return 0;
}

//ii 
#include <stdio.h>
#include <stdbool.h>

int main() {
    int n;
    bool allDistinct = true;

    printf("Enter number of elements in array: ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter array elements:\n");
    for (int i = 0; i < n; i++) {
        printf("Element %d: ", i + 1);
        scanf("%d", &arr[i]);
    }

    // Check for duplicates using nested loops
    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] == arr[j]) {
                allDistinct = false;
                break;
            }
        }
        if (!allDistinct)
            break;
    }

    if (allDistinct)
        printf("All elements are distinct.\n");
    else
        printf("Not all elements are distinct.\n");

    return 0;
}


`,

  recursive: `#include <stdio.h>

int factorial(int n) {
    if (n == 0)
        return 1;
    return n * factorial(n - 1);
}

int fibonacci(int n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    int n = 5;
    printf("Factorial of %d = %d\n", n, factorial(n));
    printf("Fibonacci of %d = %d\n", n, fibonacci(n));

    return 0;
}
`,

  quickSort: `
#include <stdio.h>

void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int partition(int a[], int low, int high) {
    int pivot = a[low];  // pivot is the first element now
    int i = low + 1;
    int j = high;

    while (i <= j) {
        while (i <= high && a[i] <= pivot) i++;
        while (a[j] > pivot) j--;
        if (i < j) {
            swap(&a[i], &a[j]);
        }
    }
    swap(&a[low], &a[j]); // place pivot in correct position
    return j;
}

void quick_sort(int a[], int low, int high) {
    if (low < high) {
        int pi = partition(a, low, high);
        quick_sort(a, low, pi - 1);
        quick_sort(a, pi + 1, high);
    }
}

int main() {
    int a[] = {6, 3, 9, 5, 2, 8};
    int n = sizeof(a) / sizeof(a[0]);

    quick_sort(a, 0, n - 1);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", a[i]);

    return 0;
}

`,

  bfs: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX 100

int adj[MAX][MAX], queue[MAX], visited[MAX];
int front = 0, rear = -1;

void enqueue(int v) { queue[++rear] = v; }
int dequeue() { return queue[front++]; }

void bfs(int start, int n) {
    visited[start] = 1;
    enqueue(start);
    printf("BFS order: ");

    while (front <= rear) {
        int v = dequeue();
        printf("%d ", v);
        for (int i = 0; i < n; i++) {
            if (adj[v][i] && !visited[i]) {
                visited[i] = 1;
                enqueue(i);
            }
        }
    }
    printf("\n");
}

int main() {
    int n, m, u, v, start;
    printf("Enter number of vertices and edges: ");
    scanf("%d %d", &n, &m);

    printf("Enter edges (u v):\n");
    for (int i = 0; i < m; i++) {
        scanf("%d %d", &u, &v);
        adj[u][v] = adj[v][u] = 1; // undirected
    }

    printf("Enter start vertex: ");
    scanf("%d", &start);

    bfs(start, n);
    return 0;
}

`,

  elementUniqueness: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

int compare(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int main() {
    int n;
    bool allDistinct = true;

    printf("Enter number of elements in array: ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter array elements:\n");
    for (int i = 0; i < n; i++) {
        printf("Element %d: ", i + 1);
        scanf("%d", &arr[i]);
    }

    qsort(arr, n, sizeof(int), compare);

    for (int i = 0; i < n - 1; i++) {
        if (arr[i] == arr[i + 1]) {
            allDistinct = false;
            break;
        }
    }

    if (allDistinct)
        printf("All elements are distinct.\n");
    else
        printf("Not all elements are distinct.\n");

    return 0;
}
`,

  horspool: `
#include <stdio.h>
#include <string.h>   
#include <limits.h>   

#define ALPHABET 256   

void buildShift(const char *pat, int m, int shift[])
{
    for (int c = 0; c < ALPHABET; ++c)   
        shift[c] = m;

    for (int i = 0; i < m - 1; ++i)      
        shift[(unsigned char)pat[i]] = m - 1 - i;
}

int horspool(const char *text, const char *pat)
{
    int n = strlen(text);
    int m = strlen(pat);
    if (m == 0 || m > n) return -1;

    int shift[ALPHABET];
    buildShift(pat, m, shift);

    int i = m - 1;                       
    while (i < n) {
        int k = 0;                       
        while (k < m && pat[m - 1 - k] == text[i - k])
            ++k;                         

        if (k == m)                      
            return i - m + 1;

        i += shift[(unsigned char)text[i]];  
    }
    return -1;                           
}

int main(void)
{
    char text[200], pat[50];
    printf("Text   : "); fgets(text, sizeof(text), stdin);
    printf("Pattern: "); fgets(pat,  sizeof(pat),  stdin);

    text[strcspn(text, "\n")] = pat[strcspn(pat, "\n")] = '\0';
//n n 0
    int pos = horspool(text, pat);
    if (pos == -1)
        puts("Pattern NOT found.");
    else
        printf("Pattern found at index %d.\n", pos);

    return 0;
}

`,

  knapsack: `#include <stdio.h>

int max(int a, int b) {
    return (a > b) ? a : b;
}

int knapsack(int W, int wt[], int val[], int n) {
    int dp[n + 1][W + 1];

    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0)
                dp[i][w] = 0;
            else if (wt[i - 1] <= w)
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }

    return dp[n][W];
}

int main() {
    int val[] = {60, 100, 120};
    int wt[]  = {10, 20, 30};
    int W = 50;
    int n = sizeof(val) / sizeof(val[0]);

    printf("Maximum value in Knapsack = %d\n", knapsack(W, wt, val, n));
    return 0;
}

`,

  dijkstra: `#include <stdio.h>
#include <limits.h>
#define V 5

int minDistance(int dist[], int visited[]) {
    int min = INT_MAX, min_index = -1;

    for (int v = 0; v < V; v++)
        if (!visited[v] && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }

    return min_index;
}

void dijkstra(int graph[V][V], int src) {
    int dist[V];
    int visited[V] = {0};

    for (int i = 0; i < V; i++)
        dist[i] = INT_MAX;
    dist[src] = 0;

    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, visited);
        if (u == -1) break; // Prevent invalid index
        visited[u] = 1;

        for (int v = 0; v < V; v++) {
            if (!visited[v] && graph[u][v] && dist[u] != INT_MAX
                && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }

      printf("Vertex	Distance from Source");
    for (int i = 0; i < V; i++)
        printf("%d\t%d\n", i, dist[i]);
    
    //printf("%d tab %d NEXTLINE", i, dist[i]);
}

int main() {
    int graph[V][V] = {
        {0, 10, 0, 0, 5},
        {0, 0, 1, 0, 2},
        {0, 0, 0, 4, 0},
        {7, 0, 6, 0, 0},
        {0, 3, 9, 2, 0}
    };

    dijkstra(graph, 0);
    return 0;
}

`,

};

const select = document.getElementById("programSelect");
const title = document.getElementById("programTitle");
const code = document.getElementById("programCode");

select.addEventListener("change", () => {
  const selected = select.value;
  title.innerText = select.options[select.selectedIndex].text;
  code.innerText = programs[selected] || "// Program not found.";
});

function copyCode() {
  navigator.clipboard.writeText(code.innerText);
}
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Change the button icon
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';  // Switch to light mode
    } else {
        themeToggle.textContent = '🌙';  // Switch to dark mode
    }
});

window.onload = function () {
  document.getElementById('programSelect').dispatchEvent(new Event('change'));
};
