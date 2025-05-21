using BenchmarkDotNet.Running;
using Enterprise.Benchmarks.DataProcessing;
using Enterprise.Benchmarks.StringHandling;

namespace Enterprise.Benchmarks
{
    public class Program
    {
        public static void Main(string[] args)
        {
            if (args.Length > 0)
            {
                // Run specific benchmark based on command line arguments
                switch (args[0].ToLower())
                {
                    case "string":
                        BenchmarkRunner.Run<StringHandlingBenchmarks>();
                        break;
                    case "data":
                        BenchmarkRunner.Run<DataProcessingBenchmarks>();
                        break;
                    default:
                        Console.WriteLine("Unknown benchmark type. Please use 'string' or 'data'.");
                        break;
                }
            }
            else
            {
                // Run all benchmarks
                BenchmarkSwitcher.FromAssembly(typeof(Program).Assembly).Run(args);
            }
        }
    }
} 