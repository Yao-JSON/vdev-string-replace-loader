const path = require('path')
const fs = require('fs')
const { expect } = require('chai')
const webpack = require('webpack')


const entryFilePath = path.join(__dirname, 'demo/entry.js')
const outputDirPath = path.join(__dirname, 'build')
const outputFileName = 'demo-build.js'
const outputFilePath = path.join(outputDirPath, outputFileName)

function getTestWebPackConfig(loaderConfig) {
  return {
    mode: 'development',
    entry: entryFilePath,
    output: {
      path: outputDirPath,
      filename: outputFileName
    },
    module: {
      rules: [
        loaderConfig
      ]
    }
  }
}

describe('Webpack replace loader ...', () => {
  it('should replace with string ctxPath', done => {
    webpack(getTestWebPackConfig(
      {
        test: /\.js$/,
        loader: '__this-loader',
        options: {
          search: 'MountNode',
          replace: `document.getElementById('[name]')`,
          ctxPath: path.resolve(__dirname, 'demo/other.js')
        }
      }),
      (error, stats) => {
        expect(error).to.equal(null)
        fs.readFile(outputFilePath, 'utf8', (error, contents) => {
          expect(error).to.equal(null)
          expect(contents).to.be.a('string')
          expect(contents).to.not.include('document.getElementById("demo01")')
          expect(contents).to.not.include('document.getElementById("demo02")')
          expect(contents).to.be.include("document.getElementById('other')")
          done()
        })
      }
    )
  })

  it('should replace with string ctxPath', done => {
    webpack(getTestWebPackConfig(
      {
        test: /\.js$/,
        loader: '__this-loader',
        options: {
          search: 'MountNode',
          replace: `document.getElementById('[name]')`,
          ctxPath: path.resolve(__dirname, 'demo/test')
        }
      }),
      (error, stats) => {
        expect(error).to.equal(null)
        fs.readFile(outputFilePath, 'utf8', (error, contents) => {
          expect(error).to.equal(null)
          expect(contents).to.be.a('string')
          expect(contents).to.be.include("document.getElementById('demo01')")
          expect(contents).to.be.include("document.getElementById('demo02')")
          expect(contents).to.not.include("document.getElementById('test')")
          done()
        })
      }
    )
  })

})
